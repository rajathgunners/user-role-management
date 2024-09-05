import models from "../models"
import BadRequestError from "../utils/errorUtils/badRequestError"
import NotFoundError from "../utils/errorUtils/notFoundError"
import ForbiddenRequestError from "../utils/errorUtils/forbiddenRequestError"
import _ from "lodash";

import {
    createRoleReqDto,
    createRoleResDto,
    updateRoleScopesReqDto,
    getRolesResDto,
    getRoleReqDto,
    getRoleResDto,
} from "../types/roles"

const validateRoleCreation = async ({ roleName, scopeIds }: createRoleReqDto): Promise<void> => {
    console.log(`Inside roleService.validateRoleCreation`);
    console.log("payload", { roleName, scopeIds });

    if (!roleName) throw new BadRequestError("roleName is required field");
    if (_.isEmpty(scopeIds)) throw new BadRequestError("scopeIds is required array field");

    const roleExists = await models.Role.findOne({ where: { roleName }, raw: true, attributes: ["id"] });
    if (roleExists) throw new ForbiddenRequestError("Role name already exists");
    const scopes = await models.Scope.findAll({ where: { id: { [models.Op.in]: scopeIds } }, raw: true, attributes: ["id"] });
    if (scopes.length !== scopeIds.length) throw new NotFoundError("Scopes provided not found in DB");
}

const validateRoleScopesUpdation = async ({ roleId, scopeIds, action }: updateRoleScopesReqDto) => {
    console.log(`Inside roleService.updateRoleScopes`);
    console.log("payload", { roleId, scopeIds, action });

    if (!roleId) throw new BadRequestError("roleId is required field");
    if (_.isEmpty(scopeIds)) throw new BadRequestError("scopeIds is required array field");

    const role = await models.Role.findOne({ where: { id: roleId }, raw: true, attributes: ["id"] });
    if (!role) throw new NotFoundError("Role provided not found in DB")

    const scopes = await models.Scope.findAll({ where: { id: { [models.Op.in]: scopeIds } }, raw: true, attributes: ["id"] });
    if (scopes.length !== scopeIds.length) throw new NotFoundError("Scopes provided not found in DB");

    if (!["add", "remove"].includes(action)) throw new BadRequestError("action must \"add\" or \"remove\"");
}

const createRole = async ({ roleName, scopeIds }: createRoleReqDto): Promise<createRoleResDto> => {
    console.log(`Inside roleService.createRole`);
    console.log("payload", { roleName, scopeIds });

    let newRole = await models.Role.create({ roleName }, { returning: ["id", "roleName", "createdAt", "updatedAt"] });
    newRole = newRole.get({ plain: true })

    const bulkCreateRoleScopesQuery = scopeIds.map((scopeId: number) => {
        return {
            roleId: newRole.id,
            scopeId,
        }
    })
    await models.RoleScope.bulkCreate(bulkCreateRoleScopesQuery);

    const scopes = await models.RoleScope.findAll({
        where: { roleId: newRole.id },
        attributes: ["Scope.id", "Scope.scopeName", "Scope.scopeService", "Scope.scopeAction"],
        include: {
            model: models.Scope,
            required: true,
            attributes: []
        },
        required: true,
        raw: true
    })

    newRole.scopes = scopes

    return newRole;
}

const updateRoleScopes = async (
    { roleId, scopeIds, action }: updateRoleScopesReqDto
): Promise<void> => {
    console.log(`Inside roleService.updateRoleScopes`);
    console.log("payload", { roleId, scopeIds, action });

    if (action === "add") {
        const bulkCreatePayload = scopeIds.map((scopeId: number) => ({ roleId, scopeId }));
        await models.RoleScope.bulkCreate(bulkCreatePayload, { ignoreDuplicates: true });
    } else if (action === "remove") {
        await models.RoleScope.destroy({ where: { roleId, scopeId: { [models.Op.in]: scopeIds } } });
    }
}

const getRoles = async (): Promise<Array<getRolesResDto>> => {
    console.log(`Inside roleService.getRoles`);
    const roles = await models.Role.findAll({
        attributes: ["id", "roleName", "createdAt", "updatedAt"],
        raw: true
    });
    return roles;
}

const getRole = async ({ roleId }: getRoleReqDto): Promise<getRoleResDto> => {
    console.log(`Inside roleService.getRole`);
    const [role, roleScopes] = await Promise.all([
        models.Role.findOne({
            attributes: ["id", "roleName", "createdAt", "updatedAt"],
            raw: true
        }),
        models.RoleScope.findAll({
            where: { roleId },
            attributes: [["scopeId", "id"], "Scope.scopeName", "Scope.scopeService", "Scope.scopeAction"],
            include: {
                model: models.Scope,
                required: true,
                attributes: []
            },
            required: true,
            raw: true
        })
    ]);

    role.scopes = roleScopes;
    return role;
}

export default {
    validateRoleCreation,
    createRole,
    validateRoleScopesUpdation,
    updateRoleScopes,
    getRoles,
    getRole,
}
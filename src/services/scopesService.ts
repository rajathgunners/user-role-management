import models from "../models"
import BadRequestError from "../utils/errorUtils/badRequestError"
import NotFoundError from "../utils/errorUtils/notFoundError"
import ForbiddenRequestError from "../utils/errorUtils/forbiddenRequestError"
import _ from "lodash";

import {
    createScopeReqDto,
    createScopeResDto,
    deleteScopeReqDto,
    listScopesResDto,
} from "../types/scopes";

const validateScopeCreation = async ({ scopeName }: createScopeReqDto): Promise<void> => {
    console.log(`Inside roleService.validateScopeCreation`);
    console.log("payload", { scopeName });

    const isScopeNameValid = (/^[^:]+:(list|create|update|delete)$/.test(scopeName));
    if (!isScopeNameValid) throw new BadRequestError("scopeName does not match required pattern, {service}:{list|create|update|delete}");

    const isScopeNameExists = await models.Scope.findOne({ where: { scopeName }, attributes: ["id"], raw: true });
    if (isScopeNameExists) throw new ForbiddenRequestError("scopeName already exists in DB");
}

const validateScopeDeletion = async ({ scopeId }: deleteScopeReqDto): Promise<void> => {
    console.log(`Inside roleService.validateScopeCreation`);
    console.log("payload", { scopeId });

    const isScopeExists = await models.Scope.findOne({ where: { id: scopeId }, attributes: ["id"], raw: true });
    if (!isScopeExists) throw new NotFoundError("scopeId not found in DB");

    const rolesHavingScope = await models.RoleScope.findAll({
        where: { scopeId },
        include: { model: models.Role, attributes: ["roleName"] },
        attributes: ["roleId", "scopeId"],
        raw: true
    }
    );
    if (rolesHavingScope.length) {
        const roles = _.map(rolesHavingScope, "Role.roleName");
        throw new ForbiddenRequestError(`scope part of roles: ${roles}. Please remove the scope from the roles before deleting`);
    }

}

const createScope = async ({ scopeName }: createScopeReqDto): Promise<createScopeResDto> => {
    console.log(`Inside roleService.createScope`);
    console.log("payload", { scopeName });

    if (!scopeName) throw new BadRequestError("scopeName is required body parameter");
    const createdScope = await models.Scope.create({ scopeName }, { returning: ["id", "scopeName", "scopeService", "scopeAction"] });
    return createdScope;
}

const deleteScope = async ({ scopeId }: deleteScopeReqDto): Promise<void> => {
    console.log(`Inside roleService.deleteScope for scopeId: ${scopeId}`);

    if (!scopeId) throw new BadRequestError("scopeName is required body parameter");
    await models.Scope.create({ scopeId }, { returning: ["id", "scopeName", "scopeService", "scopeAction"] });
}

const listScopes = async (): Promise<Array<listScopesResDto>> => {
    console.log(`Inside roleService.listScopes`);
    const scopes = await models.Scope.findAll({ attributes: ["id", "scopeName", "scopeService", "scopeAction", "createdAt", "updatedAt"], raw: true });
    return scopes;
}

export default {
    validateScopeCreation,
    validateScopeDeletion,
    createScope,
    deleteScope,
    listScopes
}
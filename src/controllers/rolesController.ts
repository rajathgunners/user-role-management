import { NextFunction, Request, Response } from "express";
import rolesService from "../services/rolesService";

import {
    createRoleReqDto,
    createRoleResDto,
    updateRoleScopesReqDto,
    getRolesResDto,
    getRoleReqDto,
    getRoleResDto
} from "../types/roles"

const createRole = async (req: Request<{}, createRoleResDto, createRoleReqDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside createRole");
        console.log("body", req.body);

        const roleName: string = req.body.roleName
        const scopeIds: Array<number> = req.body.scopeIds;

        await rolesService.validateRoleCreation({ roleName, scopeIds });
        const createdRole = await rolesService.createRole({ roleName, scopeIds })
        res.send(createdRole);
    } catch (error) {
        console.error("ERROR: Failed to create role with scopes", error);
        next(error);
    }
}

const updateRoleScopes = async (req: Request<{}, {}, updateRoleScopesReqDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside createRole");
        console.log("body", req.body);

        const { roleId, scopeIds, action } = req.body;

        await rolesService.validateRoleScopesUpdation({ roleId, scopeIds, action });
        await rolesService.updateRoleScopes({ roleId, scopeIds, action });
        res.send({ success: true });

    } catch (error) {
        console.error("ERROR: Failed to update role with scopes", error);
        next(error);
    }
}

const getRoles = async (req: Request<{}, Array<getRolesResDto>>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside getRoles");

        const roles = await rolesService.getRoles();
        res.send(roles);

    } catch (error) {
        console.error("ERROR: Failed to get roles", error);
        next(error);
    }
}

const getRole = async (req: Request<getRoleReqDto, getRoleResDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside getRoles");
        console.log("payload", req.params);

        const { roleId } = req.params
        const roleWithScopes = await rolesService.getRole({ roleId });
        res.send(roleWithScopes);

    } catch (error) {
        console.error("ERROR: Failed to get role with scopes", error);
        next(error);
    }
}

export default {
    createRole,
    updateRoleScopes,
    getRoles,
    getRole
}
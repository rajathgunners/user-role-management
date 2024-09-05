import { NextFunction, Request, Response } from "express";
import scopesService from "../services/scopesService";
import { createScopeReqDto, createScopeResDto, deleteScopeReqDto, listScopesResDto } from "../types/scopes";

const createScope = async (req: Request<{}, createScopeResDto, createScopeReqDto, { scopeName: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside createScope");
        console.log("body", req.body);
        const scopeName: string = req.body.scopeName
        await scopesService.validateScopeCreation({ scopeName });
        const createdScope = await scopesService.createScope({ scopeName })
        res.send(createdScope);
    } catch (error) {
        console.error("ERROR: Failed to create scope", error);
        next(error);
    }
}

const deleteScope = async (req: Request<{}, {}, deleteScopeReqDto>, res: Response, next: NextFunction): Promise<void> => {
    let scopeId: number | null = null;
    try {
        console.log("Inside createScope");
        console.log("body", req.body);
        scopeId = req.body.scopeId
        await scopesService.validateScopeDeletion({ scopeId });
        await scopesService.deleteScope({ scopeId })
        res.send({ success: true });
    } catch (error) {
        console.error(`ERROR: Failed to delete scope for scopeId: ${scopeId}`, error);
        next(error);
    }
}

const listScopes = async (req: Request<{}, Array<listScopesResDto>>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside listScopes");
        const scopes = await scopesService.listScopes()
        res.send(scopes);
    } catch (error) {
        console.error(`ERROR: Failed to list scopes`, error);
        next(error);
    }
}

export default {
    createScope,
    deleteScope,
    listScopes,
}
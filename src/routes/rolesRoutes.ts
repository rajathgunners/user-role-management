import rolesController from "../controllers/rolesController";
import { IRoutes, IRoutesObject } from "../types/routes"
import logRequestInfoMiddleware from "../middlewares/loggingMiddleware";
import Joi from "joi";
import expressJoiValidator from "../middlewares/express-joi-validator-v2";


const routesBasePath: string = "/roles";
const routesArray: Array<IRoutesObject> = [
    {
        method: "post",
        path: "/",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                body: {
                    schema: {
                        roleName: Joi.string(),
                        scopeIds: Joi.array().items(Joi.number())
                    }
                }
            })
        ],
        controller: rolesController.createRole,
    },
    {
        method: "put",
        path: "/:roleId/scopes",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                params: {
                    schema: {
                        roleId: Joi.number().required()
                    },
                },
                body: {
                    scopeIds: Joi.array().items(Joi.number())
                }
            })
        ],
        controller: rolesController.updateRoleScopes,
    },
    {
        method: "get",
        path: "/",
        pre: [
            logRequestInfoMiddleware,
        ],
        controller: rolesController.getRoles,
    },
    {
        method: "get",
        path: "/:roleId",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                params: {
                    schema: {
                        roleId: Joi.number().required()
                    },
                },
            })

        ],
        controller: rolesController.getRole,
    },
]

const routes: IRoutes = {
    routesBasePath,
    routes: routesArray
}

export default routes;
import scopesController from "../controllers/scopesController";
import { IRoutes, IRoutesObject } from "../types/routes"
import logRequestInfoMiddleware from "../middlewares/loggingMiddleware";
import Joi from "joi";
import expressJoiValidator from "../middlewares/express-joi-validator-v2";

const routesBasePath: string = "/scopes";
const routesArray: Array<IRoutesObject> = [
    {
        method: "get",
        path: "/",
        pre: [
            logRequestInfoMiddleware,
        ],
        controller: scopesController.listScopes,
    },
    {
        method: "post",
        path: "/",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                body: {
                    scopeName: Joi.string(),
                }
            })
        ],
        controller: scopesController.createScope,
    },
    {
        method: "delete",
        path: "/",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                body: {
                    scopeId: Joi.number(),
                }
            })
        ],
        controller: scopesController.deleteScope,
    },
]

const routes: IRoutes = {
    routesBasePath,
    routes: routesArray
}

export default routes;
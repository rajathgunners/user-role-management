import authsController from "../controllers/authsController";
import { IRoutes, IRoutesObject } from "../types/routes"
import logRequestInfoMiddleware from "../middlewares/loggingMiddleware";
import Joi from "joi";
import expressJoiValidator from "../middlewares/express-joi-validator-v2";


const routesBasePath: string = "/auths";
const routesArray: Array<IRoutesObject> = [
    {
        method: "post",
        path: "/sign-up",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                body: {
                    schema: {
                        email: Joi.string(),
                        password: Joi.string(),
                        inviteToken: Joi.string(),
                    }

                }
            })
        ],
        controller: authsController.signUp,
    },
    {
        method: "post",
        path: "/sign-in",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                body: {
                    schema: {
                        email: Joi.string(),
                        password: Joi.string(),
                    }
                }
            })
        ],
        controller: authsController.signIn,
    },
]

const routes: IRoutes = {
    routesBasePath,
    routes: routesArray
}

export default routes;
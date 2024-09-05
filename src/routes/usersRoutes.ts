import usersController from "../controllers/usersController";
import { IRoutes, IRoutesObject } from "../types/routes"
import logRequestInfoMiddleware from "../middlewares/loggingMiddleware";
import Joi from "joi";
import expressJoiValidator from "../middlewares/express-joi-validator-v2";


const routesBasePath: string = "/users";
const routesArray: Array<IRoutesObject> = [
    {
        method: "get",
        path: "/",
        pre: [
            logRequestInfoMiddleware,
        ],
        controller: usersController.getUsers,
    },
    {
        method: "put",
        path: "/roles",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                body: {
                    schema: {
                        userId: Joi.number().required(),
                        roleId: Joi.number().required(),
                    }
                }
            })
        ],
        controller: usersController.updateUserRole,
    },
    {
        method: "post",
        path: "/invite",
        pre: [
            logRequestInfoMiddleware,
            expressJoiValidator({
                body: {
                    schema: {
                        inviteeEmail: Joi.string().email(),
                        roleId: Joi.number().required(),
                    }
                }
            })
        ],
        controller: usersController.inviteUser,
    },
]

const routes: IRoutes = {
    routesBasePath,
    routes: routesArray
}

export default routes;
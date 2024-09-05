// registers all the routes to the server

import express, { Express, Router } from "express";
import appRoutes from "../routes";
import { IRoutes, IRoutesObject } from "../types/routes"


const registerRoutes = (server: Express) => {
    Object.values(appRoutes).map((routeObj: IRoutes) => {
        const router: Router = express.Router();
        routeObj.routes.map((route: IRoutesObject) => {
            const { method, pre = [], path, controller } = route;
            const handlers: Array<Function> = pre.length // add the pre middlewares to the route if exists
                ? [...pre, controller]
                : [controller];
            (router as any)[method](path, handlers); // registering handlers to the route
        })
        server.use(routeObj.routesBasePath, router) // adding sub routes to the express app with base path
    })
}

export default registerRoutes;
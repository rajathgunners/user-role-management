// Middleware to log request details for easy debugging
import { NextFunction, Request, Response } from "express"

const logRequestInfoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("<<<<<<<<<<<Logging Request Info>>>>>>>>>>>>")
    console.log({
        path: `${req.method} ${req.baseUrl + req.path}`,
        method: req.method,
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body
    })

    next();
}

export default logRequestInfoMiddleware;


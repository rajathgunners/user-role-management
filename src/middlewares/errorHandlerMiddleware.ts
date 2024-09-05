// Middleware to send error response to clients
import { NextFunction, Request, Response } from "express"

interface IError {
    statusCode: number;
    message: string;
    stack: string;
}

const errorHandlerMiddleware = (err: IError, req: Request, res: Response, next: NextFunction) => {
    console.log("Inside errorHandlerMiddleware");
    res.status(err.statusCode || 500);
    res.send({ message: err.message });
}

export default errorHandlerMiddleware;


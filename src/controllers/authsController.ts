
import { NextFunction, Request, Response } from "express";
import usersService from "../services/usersService";
import authsService from "../services/authsService";
import {
    createUserReqDto,
    createUserResDto,
} from "../types/users";
import { signInReqDto, signInResDto } from "../types/auths";

const signUp = async (req: Request<{}, { user: createUserResDto, authToken: string }, createUserReqDto>, res: Response, next: NextFunction) => {
    try {

        console.log("Inside signUp controller");
        console.log("payload", { email: req.body.email, token: req.body.inviteToken })

        await usersService.validateUserCreation(req.body);
        const user: createUserResDto = await usersService.createUser(req.body);
        const authToken: string = await authsService.generateAuthToken({ userId: user.id })

        const response = {
            user,
            authToken
        }
        res.send(response);

    } catch (error) {
        console.log(`ERROR: Failed to sign up user with email: ${req.body.email}`);
        next(error);
    }
}

const signIn = async (req: Request<{}, { user: signInResDto, authToken: string }, signInReqDto>, res: Response, next: NextFunction) => {
    try {

        console.log("Inside signIn controller");
        console.log("payload", { email: req.body.email })

        const user = await authsService.verifySignIn(req.body);
        const authToken: string = await authsService.generateAuthToken({ userId: user.id })

        const response = {
            user,
            authToken
        }
        res.send(response);

    } catch (error) {
        console.log(`ERROR: Failed to sign up user with email: ${req.body.email}`);
        next(error);
    }
}

export default {
    signUp,
    signIn,
}
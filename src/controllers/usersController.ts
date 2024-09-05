import { NextFunction, Request, Response } from "express";
import usersService from "../services/usersService"
import { updateUserRoleReqDto, inviteUserReqDto, inviteUserDto, getUsersResDto } from "../types/users"
import { authUserDto } from "../types/auths"

const getUsers = async (req: Request<{}, getUsersResDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside getUsers");
        const users = await usersService.getUsers();
        res.send(users);
    } catch (error) {
        console.error("ERROR: Failed to get users", error);
        next(error);
    }
}

const updateUserRole = async (req: Request<{}, {}, updateUserRoleReqDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside updateUserRole");
        console.log("body", req.body);

        const { userId, roleId }: { userId: number, roleId: number } = req.body
        await usersService.validateUserRoleUpdation({ userId, roleId });
        await usersService.updateUserRole({ userId, roleId })
        res.send({ success: true });
    } catch (error) {
        console.error("ERROR: Failed to update user role", error);
        next(error);
    }
}

const inviteUser = async (req: Request<{}, {}, inviteUserReqDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Inside updateUserRole");
        console.log("body", req.body);

        const user = req.user as authUserDto;
        const payload: inviteUserDto = {
            inviterId: user.userId,
            ...req.body
        }
        await usersService.validateUserInvitation(payload);
        const result = await usersService.inviteUser(payload);
        res.send(result);
    } catch (error) {
        console.error("ERROR: Failed to invite user", error);
        next(error);
    }
}



export default {
    getUsers,
    updateUserRole,
    inviteUser,
}
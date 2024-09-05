import bcrypt from "bcrypt";
import models from "../models"
import BadRequestError from "../utils/errorUtils/badRequestError";
import ForbiddenRequestError from "../utils/errorUtils/forbiddenRequestError";
import { nanoid } from "nanoid";
import * as emailValidator from 'email-validator';

import {
    createUserReqDto,
    createUserResDto,
    updateUserRoleReqDto,
    inviteUserDto,
    inviteUserResDto,
    getUsersResDto,
} from "../types/users";


const validateUserCreation = async ({ email, password, inviteToken }: createUserReqDto): Promise<void> => {
    console.log("Inside validateUserCreation");
    if (!email) throw new BadRequestError("email is required parameter");
    if (!password) throw new BadRequestError("password is required parameter");
    if (!inviteToken) throw new BadRequestError("inviteToken is required parameter");

    const [invite, emailExists] = await Promise.all([
        models.Invite.findOne({ where: { token: inviteToken }, attributes: ["id", "inviteeEmail"] }),
        models.User.findOne({ where: { email }, attributes: ["id"] })
    ])
    if (!invite) throw new ForbiddenRequestError("Invite not found in DB");
    if (email !== invite.inviteeEmail) throw new ForbiddenRequestError("Signup email does not match the invite");
    if (emailExists) throw new ForbiddenRequestError("User with email already exists in DB");
}

const validateUserRoleUpdation = async ({ userId, roleId }: updateUserRoleReqDto): Promise<void> => {
    console.log("Inside validateUserCreation");
    if (!userId) throw new BadRequestError("userId is required parameter");
    if (!roleId) throw new BadRequestError("roleId is required parameter");
    const [role, user] = await Promise.all([
        models.Role.findOne({ where: { id: roleId }, attributes: ["id"] }),
        models.User.findOne({ where: { id: userId }, attributes: ["id"] })
    ])
    if (!role) throw new ForbiddenRequestError("Role not found in DB");
    if (!user) throw new ForbiddenRequestError("User not found in DB");
}

const validateUserInvitation = async ({ inviterId, inviteeEmail, inviteeRoleId }: inviteUserDto): Promise<void> => {
    console.log("Inside validateUserInvitation");
    if (!inviterId) throw new BadRequestError("inviterId is required parameter");
    if (!inviteeEmail) throw new BadRequestError("inviteeEmail is required parameter");
    if (!inviteeRoleId) throw new BadRequestError("inviteeRoleId is required parameter");
    if (!emailValidator.validate(inviteeEmail)) throw new Error("Invitee email is not valid");

    const [inviterExists, inviteeEmailExists, inviteeRoleExists] = await Promise.all([
        models.User.findOne({ where: { id: inviterId }, attributes: ["id"], raw: true }),
        models.User.findOne({ where: { email: inviteeEmail }, attributes: ["id"], raw: true }),
        models.Role.findOne({ where: { id: inviteeRoleId }, attributes: ["id"], raw: true })
    ])
    if (!inviterExists) throw new ForbiddenRequestError("Inviter userId not found in DB");
    if (inviteeEmailExists) throw new ForbiddenRequestError("Invited user email already exists in DB");
    if (!inviteeRoleExists) throw new ForbiddenRequestError("Invitee role id does not exists in DB");
}


const createUser = async ({ email, password, inviteToken }: createUserReqDto): Promise<createUserResDto> => {
    console.log("Inside createUser");
    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("payload", { email, inviteToken });
    const invite = await models.Invite.findOne({
        where: { token: inviteToken },
        raw: true,
        attributes: ["id,", "inviteeRoleId"]
    });
    let newUser = await models.User.create({
        email,
        password: hashedPassword,
        roleId: invite.inviterRoleId,
        inviteId: invite.id
    }, { returning: ["id", "email", "roleId", "createdAt", "updatedAt"] });
    newUser = newUser.get({ plain: true });
    return newUser;
}

const updateUserRole = async ({ userId, roleId }: updateUserRoleReqDto): Promise<void> => {
    console.log("Inside createUser");
    console.log("payload", { userId, roleId });
    await models.User.updateOne({ roleId }, { where: { userId } });
    return;
}

const inviteUser = async ({ inviterId, inviteeEmail, inviteeRoleId }: inviteUserDto): Promise<inviteUserResDto> => {
    console.log("Inside inviteUser");
    console.log("payload", { inviterId, inviteeEmail, inviteeRoleId });
    const token = nanoid();
    let invite = await models.Invite.create({
        inviteeEmail,
        inviteeRoleId,
        inviterId,
        token,
    }, { returning: ["inviteeEmail", "token"] })
    invite = invite.get({ plain: true });
    return invite;
}

const getUsers = async (): Promise<getUsersResDto> => {
    console.log("Inside getUsers");
    const users = await models.User.findAll({
        attributes: ["id", "email", "roleId", "Role.roleName"],
        include: { model: models.Role },
        raw: true
    })
    return users;
}

export default {
    validateUserCreation,
    createUser,
    validateUserRoleUpdation,
    updateUserRole,
    validateUserInvitation,
    inviteUser,
    getUsers,
}

import models from "../models";
import _ from "lodash"
import jwtHelper from "../helpers/jwtHelper";
import UnauthroizedError from "../utils/errorUtils/unauthorizedError";
import bcrypt from "bcrypt"
import { authUserDto, signInReqDto, signInResDto } from "../types/auths";
import ForbiddenRequestError from "../utils/errorUtils/forbiddenRequestError";

const generateAuthToken = async ({ userId }: { userId: number }): Promise<string> => {
    console.log(`Inside generateSignInToken for userId: ${userId}`);
    const user = await models.User.findOne({
        where: { id: userId },
        attributes: ["id", "email", "roleId", "createdAt"]
    });
    const [role, roleScopes] = await Promise.all([
        models.Role.findOne({
            attributes: ["id", "roleName"],
            raw: true
        }),
        models.RoleScope.findAll({
            where: { roleId: user.roleId },
            attributes: ["Scope.scopeName"],
            include: {
                model: models.Scope,
                required: true,
                attributes: []
            },
            required: true,
            raw: true
        })
    ]);
    const jwtPayload = {
        userId: user.id,
        userEmail: user.email,
        userRoleId: role.id,
        userRoleName: role.roleName,
        userRoleScopes: new Set(_.map(roleScopes, "scopeName"))
    }
    const jwtToken = await jwtHelper.jwtSign({ payload: jwtPayload });
    return jwtToken;
}

const verifySignIn = async ({ email, password }: signInReqDto): Promise<signInResDto> => {
    console.log(`Inside verifySignIn for email: ${email}`);

    let user = models.User.findOne({
        where: { email },
        attributes: ["id", "email", "password", "roleId", "createdAt", "updatedAt"],
        raw: true
    });

    let isInvalidCredentials: boolean = false;
    if (!user) isInvalidCredentials = true;
    if (!(await bcrypt.compare(password, user.password))) isInvalidCredentials = true
    if (isInvalidCredentials) throw new UnauthroizedError("Missing or Incorrect Credentials");

    user = _.omit(user, ["password"]);
    return user;
}

const authenticateRequest = async ({ token }: { token: string }): Promise<authUserDto> => {
    console.log(`Inside authenticateRequest for jwtToken: ${token}`);
    const decodedJwtPlayload = await jwtHelper.jwtVerify({ token });
    return decodedJwtPlayload;
}

const authorizeRequest = async (
    { decodedJwt, requiredScope }: { decodedJwt: authUserDto, requiredScope: string }
) => {
    console.log(`Inside authenticateRequest for userId: ${decodedJwt.userId}`);
    console.log("payload", { decodedJwt, requiredScope });

    const userRoleScopes: Set<string> = decodedJwt.userRoleScopes;
    if (!userRoleScopes.has(requiredScope)) throw new ForbiddenRequestError("User does not have required privileges");
}

export default {
    generateAuthToken,
    verifySignIn,
    authenticateRequest,
    authorizeRequest,
}

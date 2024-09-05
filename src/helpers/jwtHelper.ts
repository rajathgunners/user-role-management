import jwt from "jsonwebtoken";
import config from "../configs"
import { authUserDto } from "../types/auths";

const jwtSign = async ({ payload }: { payload: authUserDto }): Promise<any> => {
    const jwtSignpromise = new Promise((resolve, reject) => {
        jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRY_DURATION }, function (err, token) {
            if (err) reject(err);
            resolve(token);
        })
    })

    const jwtToken = await jwtSignpromise;
    return jwtToken;
}

const jwtVerify = async ({ token }: { token: string }): Promise<any> => {
    const jwtVerifyPromise = new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET_KEY, {}, function (err, decodedPayload) {
            if (err) reject(err);
            resolve(decodedPayload);
        })
    });

    const decodedJwtPayload = await jwtVerifyPromise;
    return decodedJwtPayload;
}

export default {
    jwtSign,
    jwtVerify,
}


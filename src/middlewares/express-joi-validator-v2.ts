// TODO: convert into npm library and publish

import Joi from "joi";

/**
 validatorObject
 { 
    headers: {
        schema: {}
        joiOptions: {} //For attributes, refer https://github.com/hapijs/joi/blob/v9.0.4/API.md#validatevalue-schema-options-callback
    }
    params: {
        schema: {}
        joiOptions: {}
    }
    query: {
        schema: {}
        joiOptions: {}
    }
    body: {
        schema: {}
        joiOptions: {}
    }
    response: {
        schema: {}
        joiOptions: {}
    }
 }
 options
 {
    passError: true/false,
    statusCode: 400 (default)
 }
 */

export default function expressJoiValidator(validatorObject: any, options: any = {}) {
    const keys: Array<string> = Object.keys(validatorObject);
    const schemas: any = {};
    const joiOptions: any = {};
    const { passError = false, statusCode = 400 } = options

    for (const reqKey of keys) {
        schemas[reqKey] = Joi.object(validatorObject[reqKey].schema);
        joiOptions[reqKey] = validatorObject[reqKey].joiOptions || {};
    }

    return (req: any, res: any, next: any) => {
        let error = null;
        for (const reqKey of keys) {
            const result = schemas[reqKey].validate(req[reqKey], joiOptions[reqKey]);
            if (result.error) {
                error = result.error;
                break;
            }
        }
        if (error) {
            if (passError) {
                next(error)
            } else {
                res.status(statusCode);
                res.send(error.message);
            }
        } else {
            next();
        }

    }
}

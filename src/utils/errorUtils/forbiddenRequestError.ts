class ForbiddenRequestError extends Error {
    name: string;
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "ForbiddenRequestError";
        this.statusCode = 403;
    }
}

export default ForbiddenRequestError;
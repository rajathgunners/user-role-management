class UnauthroizedError extends Error {
    name: string;
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

export default UnauthroizedError;
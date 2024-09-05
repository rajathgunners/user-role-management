class BadRequestError extends Error {
    name: string;
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
    }
}

export default BadRequestError;
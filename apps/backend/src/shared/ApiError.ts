class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message?: string, stack?: string) {
        super(message ?? "Something went wrong");
        this.statusCode = statusCode;
        this.name = new.target.name;

        Object.setPrototypeOf(this, new.target.prototype);

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;

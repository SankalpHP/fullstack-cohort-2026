/*
|--------------------------------------------------------------------------
| Custom API Error Class
|--------------------------------------------------------------------------
| This class extends the built-in JavaScript Error object to provide
| structured and consistent error handling across the application.
|
| Why we use this:
| - Standardizes error responses
| - Attaches HTTP status codes to errors
| - Enables centralized error handling via middleware
| - Improves readability and maintainability
|
| Instead of:
| throw new Error("Something went wrong")
|
| We use:
| throw ApiError.badRequest("Invalid input")
|
| This makes errors more meaningful and controllable.
*/
class ApiError extends Error {

    /*
    |--------------------------------------------------------------------------
    | HTTP Status Code
    |--------------------------------------------------------------------------
    | Represents the HTTP status code associated with the error.
    |
    | Example:
    | 400 → Bad Request
    | 404 → Not Found
    | 500 → Internal Server Error
    */
    statusCode: number;


    /*
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    | Initializes the error with a status code and message.
    |
    | Parameters:
    | - statusCode → HTTP status code
    | - message    → error message to be sent to client
    |
    | The `super(message)` call passes the message to the base
    | Error class.
    */
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;

        /*
        --------------------------------------------------------------
        Maintain proper stack trace (important for debugging)
        --------------------------------------------------------------
        Ensures the error stack trace points to where the error
        was created instead of this constructor.
        */
        Error.captureStackTrace(this, this.constructor);
    }


    /*
    |--------------------------------------------------------------------------
    | Static Helper Methods
    |--------------------------------------------------------------------------
    | These methods create predefined error types.
    |
    | Benefits:
    | - Avoid repeating status codes everywhere
    | - Improve code readability
    | - Provide semantic meaning (badRequest, notFound, etc.)
    */


    /*
    |--------------------------------------------------------------------------
    | Not Found Error (404)
    |--------------------------------------------------------------------------
    | Used when a requested resource does not exist.
    |
    | Example:
    | throw ApiError.notFound("User not found")
    */
    static notFound(message: string = "Not found") {
        return new ApiError(404, message);
    }


    /*
    |--------------------------------------------------------------------------
    | Bad Request Error (400)
    |--------------------------------------------------------------------------
    | Used when client sends invalid or malformed request data.
    |
    | Example:
    | throw ApiError.badRequest("Invalid request body")
    */
    static badRequest(message: string = "Bad request") {
        return new ApiError(400, message);
    }


    /*
    |--------------------------------------------------------------------------
    | Unprocessable Entity Error (422)
    |--------------------------------------------------------------------------
    | Used when request data is syntactically correct but fails validation.
    |
    | Example:
    | throw ApiError.unProcessable("Email format invalid")
    */
    static unProcessable(message: string = "Invalid data Unprocessable Entity") {
        return new ApiError(422, message);
    }


    /*
    |--------------------------------------------------------------------------
    | Internal Server Error (500)
    |--------------------------------------------------------------------------
    | Used for unexpected server-side failures.
    |
    | Example:
    | throw ApiError.serverError()
    */
    static serverError(message: string = "Internal Server Error") {
        return new ApiError(500, message);
    }
}

export default ApiError;
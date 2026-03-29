/*
|--------------------------------------------------------------------------
| Import Express Response Type
|--------------------------------------------------------------------------
| The Response type represents the HTTP response object provided
| by Express.
|
| Using this type instead of `any` ensures:
| - Type safety
| - Better IntelliSense
| - Prevention of runtime mistakes
*/
import { Response } from "express";


/*
|--------------------------------------------------------------------------
| API Response Utility Class
|--------------------------------------------------------------------------
| This class standardizes all successful API responses across the
| application.
|
| Why use this:
| - Maintain consistent response structure
| - Avoid repeating res.status().json() in controllers
| - Improve code readability and maintainability
| - Provide predictable responses for frontend applications
|
| Standard Response Format:
| {
|   success: true,
|   message: "Operation successful",
|   data: { ... }
| }
|
| This class is typically used in controllers.
*/
class ApiResponse {

    /*
    |--------------------------------------------------------------------------
    | Success Response (200 OK)
    |--------------------------------------------------------------------------
    | Sends a successful HTTP response with status code 200.
    |
    | Parameters:
    | - res     → Express response object
    | - message → A descriptive success message
    | - data    → Optional response payload (default = null)
    |
    | Example Usage:
    | ApiResponse.ok(res, "User created successfully", userData);
    |
    | Response Example:
    | {
    |   success: true,
    |   message: "User created successfully",
    |   data: { id: 1, name: "Sankalp" }
    | }
    */
    static ok(res: Response, message: string, data: any = null) {

        return res.status(200).json({
            success: true,
            message,
            data
        });
    }
}

export default ApiResponse;
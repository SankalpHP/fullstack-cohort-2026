/*
|--------------------------------------------------------------------------
| Import Express Types
|--------------------------------------------------------------------------
| Request  → Represents incoming HTTP request
| Response → Represents outgoing HTTP response
|
| Using TypeScript types ensures:
| - Type safety
| - Better IntelliSense
| - Reduced runtime errors
*/
import { Request, Response } from "express";


/*
|--------------------------------------------------------------------------
| Import Service Layer
|--------------------------------------------------------------------------
| The service layer contains business logic and handles all
| database interactions.
|
| Controllers should NOT:
| - interact directly with DB
| - contain business logic
*/
import { UserService } from "../services/user.service.js";


/*
|--------------------------------------------------------------------------
| Import Validation Schema (Zod)
|--------------------------------------------------------------------------
| Zod ensures request data is valid before reaching service layer.
|
| Prevents:
| - Invalid input
| - Malicious payloads
*/
import { createUserSchema } from "../validators/user.validator.js";


/*
|--------------------------------------------------------------------------
| Import Zod Error
|--------------------------------------------------------------------------
| Used to detect validation errors thrown by Zod.
*/
import { ZodError } from "zod";


/*
|--------------------------------------------------------------------------
| Import Custom Utilities
|--------------------------------------------------------------------------
| ApiError    → used for throwing structured errors
| ApiResponse → used for sending standardized success responses
*/
import ApiError from "../../../common/utils/api.error.js";
import ApiResponse from "../../../common/utils/api.response.js";


/*
|--------------------------------------------------------------------------
| User Controller
|--------------------------------------------------------------------------
| Handles HTTP layer only.
|
| Responsibilities:
| - Receive request
| - Validate input
| - Call service
| - Send response
|
| Error Flow:
| Controller → throw ApiError → Global Middleware → Response
*/
export class userController {

    /*
    |--------------------------------------------------------------------------
    | Service Instance
    |--------------------------------------------------------------------------
    | Acts as a bridge between controller and database layer.
    */
    private user = new UserService();


    /*
    |--------------------------------------------------------------------------
    | Create User
    |--------------------------------------------------------------------------
    | POST /user
    |
    | Flow:
    | Validate → Service → DB → Response
    */
    createUser = async (req: Request, res: Response) => {
        try {

            // Step 1: Validate request body
            const isValid = await createUserSchema.parseAsync(req.body);

            // Step 2: Call service layer
            const saveUser = await this.user.createUser(
                isValid.id,
                isValid.name,
                isValid.email
            );

            // Step 3: Send success response
            return ApiResponse.ok(res, "User Successfully Created!", saveUser);

        } catch (err) {

            // Handle validation error
            if (err instanceof ZodError) {
                throw ApiError.unProcessable();
            }

            // Unknown error
            throw ApiError.serverError();
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Get All Users
    |--------------------------------------------------------------------------
    | GET /user
    */
    getUser = async (req: Request, res: Response) => {
        try {

            // Fetch users from service
            const userlist = await this.user.getUser();

            // Return response
            return ApiResponse.ok(res, "User List", userlist);

        } catch (error) {

            // Forward error to middleware
            throw ApiError.serverError();
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Get User By ID
    |--------------------------------------------------------------------------
    | GET /user/:userId
    */
    getUserId = async (req: Request, res: Response) => {
        try {

            // Extract ID from params
            const id = req.params.userId;

            // Validate ID type
            if (typeof id !== "string") {
                throw ApiError.unProcessable("Invalid ID");
            }

            // Fetch user from DB
            const user = await this.user.getUserId(id);

            // If found → return
            if (user) {
                return ApiResponse.ok(res, `User = ${id}`, user);
            }

            // If not found → throw 404
            throw ApiError.notFound("User not found");

        } catch (error) {

            // ⚠️ IMPORTANT FIX:
            // Do NOT always override error
            if (error instanceof ApiError) {
                throw error;
            }

            throw ApiError.serverError();
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    | DELETE /user/:userId
    */
    deleteUser = async (req: Request, res: Response) => {
        try {

            // Extract ID
            const id = req.params.userId;

            // Validate ID
            if (typeof id !== 'string') {
                throw ApiError.unProcessable("Invalid ID");
            }

            // Delete user
            const user = await this.user.deleteUser(id);

            // If deleted → return response
            if (user) {
                return ApiResponse.ok(res, `User deleted: ${id}`, user);
            }

            // If not found
            throw ApiError.notFound("User not found");

        } catch (error) {

            // ⚠️ IMPORTANT FIX:
            if (error instanceof ApiError) {
                throw error;
            }

            throw ApiError.serverError();
        }
    }
}
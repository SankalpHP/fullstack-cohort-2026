/*
|--------------------------------------------------------------------------
| Import Express Types
|--------------------------------------------------------------------------
| The Express framework provides Request and Response objects that
| represent the incoming HTTP request and the outgoing HTTP response.
|
| Using TypeScript types helps:
| - provide IntelliSense while coding
| - ensure type safety
| - prevent runtime errors when accessing request properties
|
| Example:
| req.body      → request payload
| req.params    → route parameters
| req.query     → query string parameters
*/
import { Request, Response } from "express";


/*
|--------------------------------------------------------------------------
| Import Service Layer
|--------------------------------------------------------------------------
| The service layer contains the business logic of the application.
|
| Controllers should NOT contain business logic because:
| - it makes the controller harder to maintain
| - logic becomes duplicated across routes
|
| Instead the controller only:
| 1. Receives HTTP requests
| 2. Validates the input
| 3. Calls the service
| 4. Sends the response
*/
import { UserService } from "../services/user.service.js";


/*
|--------------------------------------------------------------------------
| Import Validation Schema
|--------------------------------------------------------------------------
| Zod is used for request validation.
|
| The schema ensures the request body contains valid data before
| reaching the service layer.
|
| This prevents invalid or malicious data from entering the system.
*/
import { createUserSchema } from "../validators/user.validator.js";


/*
|--------------------------------------------------------------------------
| Import Zod Error Class
|--------------------------------------------------------------------------
| Zod throws a ZodError whenever validation fails.
|
| We catch this specific error to return a proper HTTP response
| with validation details instead of a generic server error.
*/
import { ZodError } from "zod";


/*
|--------------------------------------------------------------------------
| User Controller Class
|--------------------------------------------------------------------------
| Controllers are responsible for handling HTTP requests and
| coordinating between routes and services.
|
| Responsibilities:
| - Receive HTTP request
| - Validate request data
| - Call service methods
| - Send appropriate HTTP responses
|
| Controllers SHOULD NOT:
| - directly interact with database
| - contain heavy business logic
|
| This keeps the architecture clean and maintainable.
*/
export class userController {

    /*
    |--------------------------------------------------------------------------
    | Service Instance
    |--------------------------------------------------------------------------
    | Here we create an instance of the UserService class so the
    | controller can call the business logic methods.
    |
    | This instance will handle operations such as:
    | - creating a user
    | - retrieving users
    */
    private user = new UserService();


    /*
    |--------------------------------------------------------------------------
    | Create User Controller
    |--------------------------------------------------------------------------
    | Endpoint:
    | POST /user
    |
    | Purpose:
    | Creates a new user in the database.
    |
    | Example Request Body:
    |
    | {
    |   "id": 1,
    |   "name": "Sankalp Selokar",
    |   "email": "sankalp@gmail.com"
    | }
    |
    | Execution Flow:
    |
    | Client Request
    |      ↓
    | Route Layer
    |      ↓
    | Controller (this method)
    |      ↓
    | Zod Validation
    |      ↓
    | Service Layer
    |      ↓
    | Database (MongoDB)
    |      ↓
    | Response Sent Back to Client
    |
    | Arrow Function Note:
    | Arrow functions preserve `this` context when used inside
    | Express routing, preventing common binding issues.
    */
    createUser = async (req: Request, res: Response) => {

        try {

            /*
            --------------------------------------------------------------
            Step 1: Validate Incoming Request
            --------------------------------------------------------------
            Zod validates the request body against the defined schema.
            If validation fails, Zod throws an error.
            */
            let isValid = await createUserSchema.parseAsync(req.body);


            /*
            --------------------------------------------------------------
            Step 2: Call Service Layer
            --------------------------------------------------------------
            The validated data is passed to the service layer,
            which handles the database interaction.
            */
            let saveUser = await this.user.createUser(
                isValid.id,
                isValid.name,
                isValid.email
            );


            /*
            --------------------------------------------------------------
            Step 3: Send Success Response
            --------------------------------------------------------------
            If user creation succeeds, return HTTP 200 with the
            saved user document.
            */
            res
                .status(200)
                .json(saveUser);

        } catch (err) {

            /*
            --------------------------------------------------------------
            Validation Error Handling
            --------------------------------------------------------------
            If Zod validation fails, respond with HTTP 400.
            */
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: err
                });
            }

            /*
            --------------------------------------------------------------
            Unexpected Server Error
            --------------------------------------------------------------
            If any other error occurs (database failure, etc.)
            return HTTP 500.
            */
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Get Users Controller
    |--------------------------------------------------------------------------
    | Endpoint:
    | GET /user
    |
    | Purpose:
    | Retrieve all users stored in the database.
    |
    | Execution Flow:
    |
    | Client Request
    |      ↓
    | Route Layer
    |      ↓
    | Controller
    |      ↓
    | Service Layer
    |      ↓
    | Database Query
    |      ↓
    | Response Sent Back to Client
    */
    getUser = async (req: Request, res: Response) => {

        try {

            /*
            --------------------------------------------------------------
            Fetch user data from the service layer
            --------------------------------------------------------------
            The service handles database communication.
            */
            let userlist = await this.user.getUser();


            /*
            --------------------------------------------------------------
            Send Response
            --------------------------------------------------------------
            Return the list of users to the client.
            */
            res.status(200).json(userlist);

        } catch (error) {

            /*
            --------------------------------------------------------------
            Error Handling
            --------------------------------------------------------------
            If any unexpected error occurs while retrieving users,
            return HTTP 500.
            */
            res.status(500).send(error);
        }
    }
}
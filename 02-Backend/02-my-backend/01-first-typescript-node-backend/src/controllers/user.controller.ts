/*
|--------------------------------------------------------------------------
| Import Express Types
|--------------------------------------------------------------------------
| Request  → Represents the incoming HTTP request
| Response → Represents the HTTP response sent back to the client
|
| Using these types improves TypeScript safety when accessing
| req.body, req.params, res.status(), etc.
*/
import { Request, Response } from "express";


/*
|--------------------------------------------------------------------------
| Import Service Layer
|--------------------------------------------------------------------------
| The UserService contains the business logic for handling users.
| Controllers should not contain business logic themselves; instead,
| they delegate operations to the service layer.
*/
import { UserService } from "../services/user.service.js";


/*
|--------------------------------------------------------------------------
| Import Validation Schema
|--------------------------------------------------------------------------
| The Zod schema validates incoming request data before it reaches
| the business logic. This prevents invalid data from entering the
| application.
*/
import { createUserSchema } from "../validators/user.validator.js";


/*
|--------------------------------------------------------------------------
| Import Zod Error Class
|--------------------------------------------------------------------------
| ZodError is thrown when validation fails. We catch this error
| to send a meaningful response back to the client.
*/
import { ZodError } from "zod";


/*
|--------------------------------------------------------------------------
| User Controller Class
|--------------------------------------------------------------------------
| The controller layer is responsible for:
|
| - Handling HTTP requests
| - Validating incoming data
| - Calling the service layer
| - Sending responses to the client
|
| It acts as the bridge between Express routes and the service layer.
*/
export class userController {

    /*
    |--------------------------------------------------------------------------
    | Service Instance
    |--------------------------------------------------------------------------
    | We create an instance of the UserService so the controller can
    | access business logic methods like creating or retrieving users.
    */
    private user = new UserService();


    /*
    |--------------------------------------------------------------------------
    | Create User Controller
    |--------------------------------------------------------------------------
    | Handles HTTP POST requests to create a new user.
    |
    | Request Example:
    | POST /user
    |
    | Body:
    | {
    |   "id": 1,
    |   "name": "Sankalp Selokar",
    |   "email": "sankalp@gmail.com"
    | }
    |
    | Process:
    | 1. Validate request body using Zod schema
    | 2. If valid, call the service layer to create the user
    | 3. Send the created user as a JSON response
    |
    | Arrow Function:
    | Arrow functions ensure `this` always refers to the class
    | instance when used inside Express routing.
    */
    createUser = async (req: Request, res: Response) => {
        try {

            /*
            --------------------------------------------------------------
            Validate Incoming Request
            --------------------------------------------------------------
            parseAsync() checks the request body against the Zod schema.
            If validation fails, a ZodError is thrown.
            */
            let isValid = await createUserSchema.parseAsync(req.body);


            /*
            --------------------------------------------------------------
            Call Service Layer
            --------------------------------------------------------------
            If validation succeeds, we pass the validated data
            to the service layer which handles user creation.
            */
            res
                .status(200)
                .json(
                    this.user.createUser(
                        isValid.id,
                        isValid.name,
                        isValid.email
                    )
                );

        } catch (err) {

            /*
            --------------------------------------------------------------
            Validation Error Handling
            --------------------------------------------------------------
            If Zod validation fails, return HTTP 400 (Bad Request)
            with the validation details.
            */
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: err
                });
            }

            /*
            --------------------------------------------------------------
            Unexpected Error Handling
            --------------------------------------------------------------
            Any other error is treated as an internal server error.
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
    | Handles HTTP GET requests to retrieve all users.
    |
    | Request Example:
    | GET /user
    |
    | Process:
    | 1. Call the service layer to retrieve user data
    | 2. Return the user list as JSON
    */
    getUser = async (req: Request, res: Response) => {
        try {

            // Fetch user data from the service layer
            let userlist = this.user.getUser();

            // Send response back to the client
            res.status(200).json(userlist);

        } catch (error) {

            /*
            --------------------------------------------------------------
            Error Handling
            --------------------------------------------------------------
            If something unexpected happens while retrieving users,
            return a server error response.
            */
            res.status(500).send(error);
        }
    }
}
// Import Zod library for schema validation
// Zod is used to validate incoming request data (req.body)
// It ensures the API only accepts correctly structured data
import { z } from 'zod';


/*
|--------------------------------------------------------------------------
| User Creation Schema
|--------------------------------------------------------------------------
| This schema defines the expected structure of the request body when
| creating a new user.
|
| It ensures:
| - The request contains required fields
| - The fields have correct data types
| - Validation rules are enforced before reaching business logic
|
| If validation fails, Zod will throw a ZodError which can be handled
| in the controller.
*/
export const createUserSchema = z.object({

    /*
    |--------------------------------------------------------------------------
    | User ID
    |--------------------------------------------------------------------------
    | - Must be a number
    | - Cannot be negative
    | - Used as a unique identifier for the user
    */
    id: z
        .number()
        .nonnegative()
        .describe('Unique identifier for the user'),

    /*
    |--------------------------------------------------------------------------
    | User Name
    |--------------------------------------------------------------------------
    | - Must be a string
    | - Minimum length of 3 characters
    | - Ensures the name is not empty or too short
    */
    name: z
        .string()
        .min(3)
        .describe('Full name of the user'),

    /*
    |--------------------------------------------------------------------------
    | User Email
    |--------------------------------------------------------------------------
    | - Must be a string
    | - Ideally should be validated as an email format
    | - You could enhance this using `.email()`
    */
    email: z
        .string()
        .describe('Email address of the user')

});


/*
|--------------------------------------------------------------------------
| TypeScript Type Inference
|--------------------------------------------------------------------------
| `z.infer` extracts the TypeScript type from the Zod schema.
|
| This allows us to reuse the exact same structure in our services,
| controllers, and other parts of the application while keeping
| validation and types synchronized.
|
| Example usage:
|
| private users: CreateUserSchema[];
|
| This ensures every user object matches the validation schema.
*/
export type CreateUserSchema = z.infer<typeof createUserSchema>;
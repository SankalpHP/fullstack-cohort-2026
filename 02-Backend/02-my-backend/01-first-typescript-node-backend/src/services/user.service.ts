/*
|--------------------------------------------------------------------------
| Import User Type
|--------------------------------------------------------------------------
| The CreateUserSchema type is derived from the Zod validation schema.
| This ensures the data structure used inside the service layer always
| matches the validation rules defined in the validator.
|
| Using this type improves type safety and prevents invalid data
| from being stored in memory.
*/
import { CreateUserSchema } from '../validators/user.validator.js'


/*
|--------------------------------------------------------------------------
| User Service Class
|--------------------------------------------------------------------------
| The service layer is responsible for handling the business logic
| of the application. It acts as an intermediary between:
|
| Controller  → Service  → Data storage
|
| Responsibilities of this service:
| - Creating new users
| - Storing user data (currently in memory)
| - Retrieving stored user data
|
| In real-world applications, this layer usually communicates with
| databases such as MongoDB, PostgreSQL, or MySQL.
*/
export class UserService {

    /*
    |--------------------------------------------------------------------------
    | Internal User Storage
    |--------------------------------------------------------------------------
    | This private array acts as an in-memory storage for user objects.
    |
    | Each element in the array must follow the CreateUserSchema type
    | which ensures the object structure matches the validation schema.
    |
    | Example stored object:
    | {
    |   id: 1,
    |   name: "Sankalp Selokar",
    |   email: "sankalp@gmail.com"
    | }
    |
    | NOTE:
    | In production applications this would be replaced with a database.
    */
    private User: CreateUserSchema[];


    /*
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    | The constructor initializes the service when a new instance of
    | the class is created.
    |
    | Here we initialize the user storage array as empty.
    |
    | Example:
    | const userService = new UserService();
    */
    constructor() {
        this.User = []
    }


    /*
    |--------------------------------------------------------------------------
    | Create User Method
    |--------------------------------------------------------------------------
    | This method creates a new user object and stores it in memory.
    |
    | Parameters:
    | - id    → Unique identifier of the user
    | - name  → Full name of the user
    | - email → Email address of the user
    |
    | Process:
    | 1. A new user object is created
    | 2. The object is pushed into the internal user array
    | 3. The newly created user object is returned
    |
    | Arrow Function Reason:
    | Using arrow functions ensures that `this` always refers to
    | the class instance when used inside Express controllers.
    */
    createUser = (id: number, name: string, email: string) => {

        // Add new user object into in-memory storage
        this.User.push({
            id,
            name,
            email,
        });

        // Return the created user object
        return {
            id,
            name,
            email,
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Get Users Method
    |--------------------------------------------------------------------------
    | This method retrieves all stored users.
    |
    | Process:
    | 1. Access the internal user array
    | 2. Return the data wrapped inside an object
    |
    | Returning an object instead of raw array allows easier extension
    | later (for example adding metadata like pagination).
    |
    | Example response:
    | {
    |   data: [
    |     { id: 1, name: "Sankalp", email: "sankalp@gmail.com" }
    |   ]
    | }
    */
    getUser = () => {

        const data = this.User;

        return { data };
    }
}
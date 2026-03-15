/*
|--------------------------------------------------------------------------
| Import User Type
|--------------------------------------------------------------------------
| The CreateUserSchema type is inferred from the Zod validation schema.
| It ensures that the structure of the user data handled in this service
| always matches the validated request payload.
|
| Benefits:
| - Strong type safety
| - Prevents inconsistent user objects in the application
| - Keeps validation and business logic aligned
*/
import { CreateUserSchema } from '../validators/user.validator.js'


/*
|--------------------------------------------------------------------------
| Import Database Model
|--------------------------------------------------------------------------
| The `db` model represents the MongoDB collection defined using
| Mongoose in the models layer.
|
| Through this model we can perform database operations such as:
|
| - create()   → insert a new document
| - find()     → retrieve documents
| - findById() → retrieve a single document
| - updateOne()
| - deleteOne()
|
| The service layer communicates with the database through this model.
*/
import db from '../models/db.schema.js';


/*
|--------------------------------------------------------------------------
| User Service Class
|--------------------------------------------------------------------------
| The service layer contains the business logic of the application.
| It acts as a bridge between the controller layer and the database.
|
| Request Flow:
| Client → Route → Controller → Service → Database
|
| Responsibilities of this service:
| - Persist user data in MongoDB
| - Retrieve user records from MongoDB
| - Return structured data to the controller
|
| Keeping database logic here keeps controllers clean and focused
| only on handling HTTP requests and responses.
*/
export class UserService {


    /*
    |--------------------------------------------------------------------------
    | Create User Method
    |--------------------------------------------------------------------------
    | This method inserts a new user document into the MongoDB collection.
    |
    | Parameters:
    | - id    → Unique identifier for the user
    | - name  → Full name of the user
    | - email → Email address of the user
    |
    | Process:
    | 1. Receive validated user data from the controller
    | 2. Insert the document into MongoDB using Mongoose
    | 3. Return the saved document to the controller
    |
    | The returned document usually contains:
    | - MongoDB generated `_id`
    | - the inserted fields
    | - timestamps if enabled in the schema
    |
    | Example returned object:
    |
    | {
    |   _id: "653ae8...",
    |   id: 1,
    |   name: "Sankalp Selokar",
    |   email: "sankalp@gmail.com"
    | }
    */
    createUser = async (id: number, name: string, email: string) => {

        /*
        --------------------------------------------------------------
        Insert document into MongoDB
        --------------------------------------------------------------
        db.create() creates and saves a new document based on the
        schema defined in the model layer.
        */
        let savedUser = await db.create({ id, name, email })

        /*
        --------------------------------------------------------------
        Return the saved document
        --------------------------------------------------------------
        The controller will send this object back to the client
        as a JSON response.
        */
        return savedUser;
    }


    /*
    |--------------------------------------------------------------------------
    | Get Users Method
    |--------------------------------------------------------------------------
    | This method retrieves all users stored in the database.
    |
    | Process:
    | 1. Query the MongoDB collection using `find()`
    | 2. Convert the result to plain JavaScript objects using `lean()`
    | 3. Return the user list
    |
    | Why use `.lean()`?
    | - Removes Mongoose document overhead
    | - Improves performance
    | - Returns simple JSON-like objects
    |
    | Example returned data:
    |
    | [
    |   { id: 1, name: "Sankalp", email: "sankalp@gmail.com" },
    |   { id: 2, name: "John", email: "john@gmail.com" }
    | ]
    */
    getUser = async () => {

        /*
        --------------------------------------------------------------
        Retrieve users from database
        --------------------------------------------------------------
        find() → fetch all documents
        lean() → convert mongoose documents to plain objects
        */
        let userList = await db.find().lean();

        return userList;
    }
}
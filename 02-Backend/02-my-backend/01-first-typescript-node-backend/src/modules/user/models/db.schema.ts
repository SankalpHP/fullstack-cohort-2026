/*
|--------------------------------------------------------------------------
| Import Mongoose Connection
|--------------------------------------------------------------------------
| This imports the mongoose instance that was already connected
| to MongoDB in the database configuration file (`db.config.js`).
|
| By importing the connected instance instead of creating a new
| connection here, we ensure that the application uses a single
| shared database connection.
*/
import mongoose from "../../../common/dbConfig/db.config.js";


/*
|--------------------------------------------------------------------------
| Extract Schema Constructor
|--------------------------------------------------------------------------
| Mongoose provides a Schema class that is used to define the
| structure of documents inside a MongoDB collection.
|
| Each schema defines:
| - field names
| - field data types
| - validation rules
| - optional configuration options
*/
const Schema = mongoose.Schema;


/*
|--------------------------------------------------------------------------
| User Schema Definition
|--------------------------------------------------------------------------
| This schema defines the structure of a "user" document stored
| inside the MongoDB database.
|
| MongoDB stores data in collections, and each collection contains
| documents (similar to rows in relational databases).
|
| Example document stored in MongoDB:
|
| {
|   _id: ObjectId("64f23..."),
|   id: 1,
|   name: "Sankalp Selokar",
|   email: "sankalp@gmail.com"
| }
|
| NOTE:
| MongoDB automatically generates the `_id` field for every document.
*/
const users = new Schema({

    /*
    |--------------------------------------------------------------------------
    | User ID
    |--------------------------------------------------------------------------
    | A numeric identifier for the user.
    |
    | - type: Number → ensures the value stored is numeric
    | - required: true → this field must be present when creating a user
    */
    id: {
        type: Number,
        require: true, // (should ideally be "required")
    },


    /*
    |--------------------------------------------------------------------------
    | User Name
    |--------------------------------------------------------------------------
    | Stores the name of the user.
    |
    | - type: String → ensures only text values are stored
    | - required: true → the name must always be provided
    */
    name: {
        type: String,
        require: true
    },


    /*
    |--------------------------------------------------------------------------
    | User Email
    |--------------------------------------------------------------------------
    | Stores the email address of the user.
    |
    | - type: String → email is stored as text
    | - required: true → email must be provided when creating a user
    |
    | In production systems we usually add:
    | - unique: true (to prevent duplicate emails)
    | - match: regex (to validate email format)
    */
    email: {
        type: String,
        require: true
    }

});


/*
|--------------------------------------------------------------------------
| Create Mongoose Model
|--------------------------------------------------------------------------
| mongoose.model() creates a model based on the schema definition.
|
| Parameters:
| 1️⃣ 'users' → Name of the MongoDB collection
| 2️⃣ users   → Schema that defines the structure
|
| The model provides methods for interacting with the database:
|
| - create()
| - find()
| - findById()
| - updateOne()
| - deleteOne()
|
| Example usage:
|
| const newUser = await UserModel.create({
|   id: 1,
|   name: "Sankalp",
|   email: "sankalp@gmail.com"
| });
*/
export default mongoose.model('users', users);
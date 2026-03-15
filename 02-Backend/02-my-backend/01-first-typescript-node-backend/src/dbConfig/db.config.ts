/*
|--------------------------------------------------------------------------
| Import Mongoose Library
|--------------------------------------------------------------------------
| Mongoose is an Object Data Modeling (ODM) library for MongoDB.
|
| It provides:
| - Schema definitions
| - Data validation
| - Query building
| - Model abstraction
|
| Instead of writing raw MongoDB queries, we interact with the
| database using Mongoose models.
*/
import mongoose from "mongoose";


/*
|--------------------------------------------------------------------------
| Establish Database Connection
|--------------------------------------------------------------------------
| mongoose.connect() creates a connection between the Node.js
| application and the MongoDB server.
|
| Connection String Breakdown:
|
| mongodb://127.0.0.1/myShop
|
| mongodb://        → MongoDB protocol
| 127.0.0.1         → Localhost (MongoDB running on the same machine)
| myShop            → Database name
|
| If the database does not exist, MongoDB will automatically
| create it when the first document is inserted.
|
| NOTE:
| Top-level `await` is used here because the project is using
| ES Modules (type: "module" in package.json).
|
| This ensures the database connection is established before
| the application continues execution.
*/
export default await mongoose.connect('mongodb://127.0.0.1/myShop');
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
| Import dotenv Package
|--------------------------------------------------------------------------
| dotenv is used to load environment variables from a `.env` file
| into the Node.js process.
|
| This allows us to store sensitive or environment-specific data
| (like database URLs, API keys, ports) outside the source code.
|
| Example `.env` file:
|
| PORT=3000
| MONGO_URI=mongodb://127.0.0.1/myShop
|
| This improves:
| - Security (no hardcoded secrets)
| - Flexibility across environments (dev, staging, prod)
*/
import dotenv from 'dotenv';


/*
|--------------------------------------------------------------------------
| Load Environment Variables
|--------------------------------------------------------------------------
| dotenv.config() reads the `.env` file and loads its variables
| into `process.env`.
|
| After this call, you can access variables like:
|
| process.env.PORT
| process.env.MONGO_URI
|
| IMPORTANT:
| This should be called at the very beginning of the application
| (before using any environment variables).
*/
dotenv.config();

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
export default await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);
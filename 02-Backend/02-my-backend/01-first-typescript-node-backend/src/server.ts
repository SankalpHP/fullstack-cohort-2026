/*
|--------------------------------------------------------------------------
| Import Express Application
|--------------------------------------------------------------------------
| The Express application instance is imported from `app.ts`.
| 
| `app.ts` is responsible for:
| - configuring middleware
| - registering routes
| - preparing the application
|
| This file (`server.ts`) is responsible ONLY for starting the server.
| Keeping these responsibilities separate improves maintainability,
| testing, and scalability of the backend application.
*/
import app from './app.js';

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
| Start HTTP Server
|--------------------------------------------------------------------------
| `app.listen()` starts the Node.js HTTP server and begins listening
| for incoming client requests such as:
|
| - API requests from frontend applications
| - requests from Postman or API clients
|
| Parameters:
| 1️⃣ port → the network port the server listens on
| 2️⃣ callback → executed once the server successfully starts
|
| When the server starts, it prints a message in the console
| indicating that the API is ready to receive requests.
*/
app.listen(process.env.PORT, () => {
    /*
    |--------------------------------------------------------------------------
    | Server Startup Log
    |--------------------------------------------------------------------------
    | This log confirms that the backend server has started successfully
    | and indicates the URL where the API can be accessed locally.
    |
    | Example:
    | http://localhost:3000/user
    */
    console.log(`The server is running on http://localhost:${process.env.PORT}`)
});
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
| Define Server Port
|--------------------------------------------------------------------------
| This specifies the port on which the HTTP server will listen
| for incoming requests.
|
| In real production environments, the port is usually read from
| environment variables:
|
| const port = process.env.PORT || 3000;
|
| This allows the application to run on different environments
| (dev
*/
const port:Number = 3000;

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
app.listen(port,()=>{
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
    console.log(`The server is running on http://localhost:${port}`)
});
/*
|--------------------------------------------------------------------------
| Import Dependencies
|--------------------------------------------------------------------------
| - express : Core framework used to build the HTTP server
| - Request / Response : TypeScript types provided by Express
|   to enable type-safe request and response handling
|
| Using `type` keyword ensures these imports are used only
| for TypeScript type checking and will not be included in
| the compiled JavaScript output.
*/
import express, { type Request, type Response } from "express";

/*
|--------------------------------------------------------------------------
| Import Application Routes
|--------------------------------------------------------------------------
| This file contains all the routes related to user operations
| such as creating users and retrieving user data.
|
| The router will later be mounted on the `/user` base path.
*/
import userRoutes from './modules/user/routes/user.routes.js'


/*
|--------------------------------------------------------------------------
| Create Express Application Instance
|--------------------------------------------------------------------------
| `express()` initializes the Express application.
| This `app` object will be used to configure middleware,
| routes, and server behavior.
*/
const app = express();


/*
|--------------------------------------------------------------------------
| Global Middleware: JSON Parser
|--------------------------------------------------------------------------
| express.json() is built-in middleware that parses incoming
| requests with JSON payloads.
|
| Without this middleware, `req.body` would be undefined when
| sending JSON data from clients such as Postman or frontend apps.
|
| Example incoming request body:
|
| {
|   "id": 1,
|   "name": "Sankalp Selokar",
|   "email": "sankalp@gmail.com"
| }
|
| After parsing:
| req.body will contain the above object.
*/
app.use(express.json());


/*
|--------------------------------------------------------------------------
| Register User Routes
|--------------------------------------------------------------------------
| All routes defined inside `user.routes.ts` will be prefixed
| with `/user`.
|
| Example endpoints:
|
| POST /user      -> create a new user
| GET  /user      -> retrieve all users
|
| Express internally routes requests to the appropriate
| controller methods defined in the router.
*/
app.use('/user', userRoutes);


/*
|--------------------------------------------------------------------------
| Export Express App
|--------------------------------------------------------------------------
| The app instance is exported so it can be used in `server.ts`
| where the HTTP server is started using `app.listen()`.
|
| This separation helps maintain clean architecture by keeping
| application configuration separate from server startup logic.
*/
export default app;
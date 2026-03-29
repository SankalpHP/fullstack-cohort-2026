/*
|--------------------------------------------------------------------------
| Import Express
|--------------------------------------------------------------------------
| Express is used to create a Router instance. A router allows us
| to group related routes together instead of defining all routes
| directly inside the main application file.
|
| This improves modularity and makes the application easier to
| maintain as the project grows.
*/
import express from 'express'


/*
|--------------------------------------------------------------------------
| Import Controller
|--------------------------------------------------------------------------
| The UserController contains the logic for handling user-related
| operations such as creating users and retrieving user data.
|
| The router will delegate incoming HTTP requests to the appropriate
| controller methods.
*/
import { userController } from '../controllers/user.controller.js';


/*
|--------------------------------------------------------------------------
| Create Router Instance
|--------------------------------------------------------------------------
| express.Router() creates a mini-application capable of handling
| middleware and routes.
|
| This router will later be mounted in `app.ts` under the `/user`
| path prefix.
*/
const router = express.Router();


/*
|--------------------------------------------------------------------------
| Create Controller Instance
|--------------------------------------------------------------------------
| We create an instance of the UserController class so we can call
| its methods when handling incoming HTTP requests.
|
| This follows the Controller → Service architecture pattern.
*/
const user_Controller = new userController();


/*
|--------------------------------------------------------------------------
| GET /user
|--------------------------------------------------------------------------
| This route retrieves all users from the system.
|
| Endpoint:
| GET http://localhost:3000/user
|
| Flow:
| Client Request → Router → Controller → Service → Response
|
| The controller will call the service layer to fetch the user data
| and return it as a JSON response.
*/
router.get('/', user_Controller.getUser);


/*
|--------------------------------------------------------------------------
| POST /user
|--------------------------------------------------------------------------
| This route creates a new user in the system.
|
| Endpoint:
| POST http://localhost:3000/user
|
| Example Request Body:
| {
|   "id": 1,
|   "name": "Sankalp Selokar",
|   "email": "sankalp@gmail.com"
| }
|
| Flow:
| Client Request → Router → Controller → Validation → Service → Response
|
| The controller will validate the request using Zod and then
| call the service layer to store the new user.
*/
router.post('/', user_Controller.createUser);


router.get('/:userId', user_Controller.getUserId);


router.delete('/:userId', user_Controller.deleteUser)


/*
|--------------------------------------------------------------------------
| Export Router
|--------------------------------------------------------------------------
| The router is exported so it can be registered in `app.ts`.
|
| In app.ts:
| app.use('/user', userRoutes);
|
| This means all routes defined here will be prefixed with `/user`.
*/
export default router;
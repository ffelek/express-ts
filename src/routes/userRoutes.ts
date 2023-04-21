// Imports dependencies
import express, {Router} from "express";
import { userController } from "../controllers/userController";

// Creation of a new router
const userRoutes: Router = express.Router();

// Configuration of the routes for the router
userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);

// Exportation of the router after setting up the routes
export default userRoutes;
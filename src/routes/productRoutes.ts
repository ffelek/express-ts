// Imports dependencies
import express, {Router} from "express";
import {productController} from "../controllers/productController";
import {AuthenticationMiddleware} from "../middlewares/auth";

// Creation of a new router
const productRoutes: Router = express.Router();

// Configuration of the routes for the router with the implementation of a middleware
productRoutes.get("/", AuthenticationMiddleware.auth, productController.find);
productRoutes.get("/:id", AuthenticationMiddleware.auth, productController.find);
productRoutes.post("/", AuthenticationMiddleware.auth, productController.save);
productRoutes.put("/:id", AuthenticationMiddleware.auth, productController.save);
productRoutes.delete("/:id", AuthenticationMiddleware.auth, productController.delete);

// Exportation of the router after setting up the routes
export default productRoutes;
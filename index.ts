//
import cors from 'cors';
import express, {Express} from "express";
import userRoutes from "./src/routes/userRoutes";
import productRoutes from "./src/routes/productRoutes";

export const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);

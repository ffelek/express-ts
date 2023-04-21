// Import dependencies
import mysql, {PoolOptions} from 'mysql2/promise';
import dotenv from "dotenv";

// Loading of the .env file into process.env
dotenv.config();

// Preparing a variable to store information for the pool
const dbInformation : PoolOptions = {
	// create the connection
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
}

// Creation of the pool
export const pool : mysql.Pool = mysql.createPool(dbInformation);
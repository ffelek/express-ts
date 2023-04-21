// Import dependencies
import {app} from "./index";
import dotenv from "dotenv";
import {StringManipulator} from "./src/utils/stringManipulator";

// Loading of the .env file into process.env
dotenv.config();

// Launching the server
try {
	const port: number = StringManipulator.normalizePort(process.env.API_PORT!);
	app.set("port", port);
	app.listen(port, (): void => {
		console.log(`Listening on port ${port}`);
	});
} catch (e: any) {
	throw e;
}

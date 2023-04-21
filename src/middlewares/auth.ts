// Import dependencies
import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {ClientCode} from "../utils/statusCodeHTTP";


/**
 * @author felek
 * @version 1.0.0
 */
export class AuthenticationMiddleware {
	/**
	 * @author felek
	 * @version 1.0.0
	 * Middleware that make sure that a user is logged in before any action
	 * @param req Request sent from the client
	 * @param res Response sent to the client from the server
	 * @param next next middleware in stack
	 * @return Promise<void>
	 */
	public static async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// Retrieve the token from the header by removing the 'Bearer ' string
			const token: any = req.header('Authorization')!.replace('Bearer ', '');
			// Using JWT to verify that the encoded token from the header is the same as the one in the .env file
			const decodedToken: JwtPayload | string = jwt.verify(token, process.env.TOKEN_KEY!);
			// Retrieve the userId from the decodedToken
			// @ts-ignore
			const userId: number = decodedToken["userId"];
			// Save the userId to the request
			// @ts-ignore
			req.auth = {
				userId: userId,
			};
			// Call the next function in the stack
			next();
		} catch (err) {
			res.status(ClientCode.UNAUTHORIZED).json({err});
			// res.status(ClientCode.UNAUTHORIZED).json({message: 'Please authenticate'});
		}
	}
}

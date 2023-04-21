// Imports DB's connection and packages
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {pool} from "../config/db";
import {SQLCode} from "../utils/codeSQL";
import {Request, Response} from "express";
import {ClientCode, ServerCode, SuccessCode} from "../utils/statusCodeHTTP";
import {FieldPacket, OkPacket, ResultSetHeader, RowDataPacket} from "mysql2";

// Enumeration for the salt used by the hash
enum HashSalt {
	SALT_OR_ROUNDS = 10
}

/**
 * @author felek
 * @version 1.0.0
 */
export class userController {

	/**
	 * @author felek
	 * @version 1.0.0
	 * Allows a user to signup on the site (if he's not)
	 * @param req Request sent by the client's side
	 * @param res Response the server will send to the client
	 * @return Promise<void>
	 */
	public static async register(req: Request, res: Response): Promise<void> {
		try {
			// Hashing the plain password
			const hashedPassword: string = await bcrypt.hash(req.body.password, HashSalt.SALT_OR_ROUNDS);
			await pool.query(
				`INSERT INTO User (user_name, password, modification_date)
                 VALUES (?, ?, NOW())`,
				[
					req.body.user_name,
					hashedPassword
				],
			)
			// Success, we send the good news
			res.status(SuccessCode.OK).json({message: "Inscription successful!"});
		} catch (error: any) {
			if (error) {
				// Checks if the error number is the one for a duplicate entry
				if (error.errno === SQLCode.DUPLICATE_ENTRY) {
					res.status(ServerCode.INTERNAL_SERVER_ERROR).json({message: "You already own an account!"});
				} else {
					res.status(ServerCode.INTERNAL_SERVER_ERROR).json({error});
				}
			}
		}
	}

	/**
	 * @author felek
	 * @version 1.0.0
	 * Allows a user to login onto the site (if he's not)
	 * @param req Request sent by the client's side
	 * @param res Response the server will send to the client
	 * @return Promise<void>
	 */
	public static async login(req: Request, res: Response): Promise<void> {
		try {
			// Execute the query and save the result in a variable
			const result: [(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]] = await pool.query(
				`SELECT u.*, p.description
                 FROM User AS u
                          INNER JOIN Permissions AS p ON (u.id_permission = p.id AND p.active = 1)
                 WHERE user_name = ?
                   AND u.active = 1`,
				[req.body.user_name],
			)
			// Parses the result[0] (that contains the wanted information) from JSON
			const resultInformation = JSON.parse(JSON.stringify(result[0]))[0];
			// Checks if the password from the query is the same that the one that is in the request body
			const isPasswordCorrect: boolean = await bcrypt.compare(req.body.password, resultInformation.password);
			if (!isPasswordCorrect) {
				// If it is not the same, sends an error
				res.status(ClientCode.UNAUTHORIZED).json({message: "The password is incorrect. Please make sure to not write caps letters."});
			} else {
				// Otherwise, sends the information in JSON format
				res.status(SuccessCode.OK).json({
					id_permission: resultInformation.id_permission,
					token: jwt.sign(
						{userId: resultInformation.id},
						process.env.TOKEN_KEY!,
						{expiresIn: "1h"}
					),
					user: {
						userId: resultInformation.id,
						user_name: resultInformation.user_name
					},
				});
			}
		} catch (err: any) {
			res.status(ServerCode.INTERNAL_SERVER_ERROR).json({message: "The user was not found."});
		}
	}
}

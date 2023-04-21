// Import dependencies
import {pool} from "../config/db";
import {Request, Response} from "express";
import {FieldPacket, OkPacket, ResultSetHeader, RowDataPacket} from "mysql2";
import {ClientCode, ServerCode, SuccessCode} from "../utils/statusCodeHTTP";

/**
 * @author felek
 * @version 1.0.0
 */
export class productController {

	/**
	 * @author felek
	 * @version 1.0.0
	 * Retrieve either all or one product(s) from the database
	 * @param req Request sent by the client's side
	 * @param res Response the server will send to the client
	 * @return Promise<void>
	 */
	public static async find(req: Request, res: Response): Promise<void> {
		try {
			const id: any = req.params.id;
			const result: [(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]] = await pool.query(
				"SELECT * FROM Product " + (id ? `WHERE id = ${id}` : "")
			)
			const resultInformation = JSON.parse(JSON.stringify(result[0]));
			if (!resultInformation) {
				res.status(ClientCode.UNAUTHORIZED).json({message: "The password is incorrect. Please make sure to not write caps letters."});
			} else {
				res.status(SuccessCode.OK).json(resultInformation);
			}
		} catch (err: any) {
			res.status(ServerCode.INTERNAL_SERVER_ERROR).json({err});
		}
	}

	/**
	 * @author felek
	 * @version 1.0.0
	 * Add or update a product
	 * @param req Request sent by the client's side
	 * @param res Response the server will send to the client
	 * @return Promise<void>
	 */
	public static async save(req: Request, res: Response): Promise<void> {
		try {
			const id: any = req.params.id;
			const result: [(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]] = await pool.query(
				!id ?
					`INSERT INTO Product (name, description, stock_quantity, price)
                     VALUES (?, ?, ?, ?)`
					:
					`UPDATE Product
                     SET name           = ?,
                         description    = ?,
                         stock_quantity = ?,
                         price          = ?
                     WHERE id = ${id}`,
				[req.body.name, req.body.description, req.body.stock_quantity, req.body.price],
			)
			// @ts-ignore
			if (result[0].insertId && result[0].insertId > 0) {
				res.status(SuccessCode.OK).json({message: "Your item was added successfully."});
			// @ts-ignore
			} else if (result[0].changedRows && result[0].changedRows > 0) {
				res.status(SuccessCode.OK).json({message: "Your item was updated successfully."});
			} else {
				res.status(ServerCode.INTERNAL_SERVER_ERROR).json({message: "An unexpected error occurred. Please try again later."});
			}
		} catch (e: any) {
			res.status(ClientCode.UNAUTHORIZED).json({message: "The password is incorrect. Please make sure to not write caps letters."});
		}
	}

	/**
	 * @author felek
	 * @version 1.0.0
	 * Delete a product
	 * @param req Request sent by the client's side
	 * @param res Response the server will send to the client
	 * @return Promise<void>
	 */
	public static async delete(req: Request, res: Response): Promise<void> {
		try {
			const result: [(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]] = await pool.query(
				`DELETE FROM Product WHERE id = ?`,
				[req.params.id]
			)
			// Checks within the result if it was deleted or not
			// @ts-ignore
			if (result[0].affectedRows && result[0].affectedRows > 1) {
				res.status(SuccessCode.OK).json({message: "Your item was deleted successfully."});
			} else {
				res.status(ServerCode.INTERNAL_SERVER_ERROR).json({message: "Nothing was deleted. Make sure to use an existing identifier."});
			}
		} catch (e: any) {
			res.status(ClientCode.UNAUTHORIZED).json({message: "The password is incorrect. Please make sure to not write caps letters."});
		}
	}
}

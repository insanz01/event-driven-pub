import { type Request, type Response, type NextFunction } from 'express'

import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as bookService from './book.service'

export const getAllBooks = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const data = await bookService.getBooks()
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(response, data, 'Books fetched successfully')
}

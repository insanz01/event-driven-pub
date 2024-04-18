import { type NextFunction, type Request, type Response } from 'express'
import { AppError } from 'src/middleware'
import { ResponseHandler } from 'src/utils'

import * as bookService from './book.service'

export const storeBook = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const data = req.body
	const result = await bookService.createBook(data)
	if (result instanceof AppError) {
		next(result)
		return
	}

	return ResponseHandler.created(res, result, 'Book created successfully')
}

export const getAllBooks = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await bookService.getBooks()
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, result, 'Books fetched successfully')
}

export const updateBook = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params
	const data = req.body
	const result = await bookService.updateBook(parseInt(id), data)
	if (result instanceof AppError) {
		next(result)
		return
	}
	return ResponseHandler.ok(res, result, 'Book updated successfully')
}

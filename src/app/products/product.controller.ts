import { type Request, type Response, type NextFunction } from 'express'

import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as productService from './product.service'

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const result = await productService.getProducts()
	if (result instanceof AppError) {
		next(result)
		return
	}
	ResponseHandler.ok(res, result, 'Products fetched successfully')
}

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params
	const result = await productService.getProduct(parseInt(id))
	if (result instanceof AppError) {
		next(result)
		return
	}
	ResponseHandler.ok(res, result, 'Product fetched successfully')
}

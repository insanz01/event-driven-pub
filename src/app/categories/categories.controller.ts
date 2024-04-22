import { type NextFunction, type Request, type Response } from 'express'

import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as categoryService from './categories.service'

export const createCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const category = await categoryService.createCategory(body)
	if (category instanceof AppError) {
		next(category)
		return
	}
	ResponseHandler.ok(res, null, 'Category created successfully')
}

export const getCategories = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const categories = await categoryService.getCategories(query)
	if (categories instanceof AppError) {
		next(categories)
		return
	}
	ResponseHandler.ok(
		res,
		categories?.data,
		'Categories fetched successfully',
		categories?.meta,
	)
}

export const getCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { categoryId } = req.params
	if (isNaN(Number(categoryId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			'Invalid categoryId',
		)
		next(error)
		return
	}
	const category = await categoryService.getCategory(Number(categoryId))
	if (category instanceof AppError) {
		next(category)
		return
	}
	ResponseHandler.ok(res, category, 'Category fetched successfully')
}

export const updateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { categoryId } = req.params
	if (isNaN(Number(categoryId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			'Invalid categoryId',
		)
		next(error)
		return
	}
	const { body } = req
	const category = await categoryService.updateCategory(
		Number(categoryId),
		body,
	)
	if (category instanceof AppError) {
		next(category)
		return
	}
	ResponseHandler.ok(res, null, 'Category updated successfully')
}

export const deleteCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { categoryId } = req.params
	if (isNaN(Number(categoryId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			'Invalid categoryId',
		)
		next(error)
		return
	}
	const category = await categoryService.deleteCategory(Number(categoryId))
	if (category instanceof AppError) {
		next(category)
		return
	}
	ResponseHandler.ok(res, null, 'Category deleted successfully')
}

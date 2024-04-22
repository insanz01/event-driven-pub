import { type NextFunction, type Request, type Response } from 'express'

import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as subCategoryService from './sub-categories.service'

export const createSubCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const subCategory = await subCategoryService.createSubCategory(body)
	if (subCategory instanceof AppError) {
		next(subCategory)
		return
	}
	ResponseHandler.ok(res, null, 'Sub category created successfully')
}

export const getSubCategories = async (
	req: Request & { query: QueryParams & { categoryId?: string } },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const subCategories = await subCategoryService.getSubCategories(query)
	if (subCategories instanceof AppError) {
		next(subCategories)
		return
	}
	ResponseHandler.ok(
		res,
		subCategories?.data,
		'Sub categories fetched successfully',
		subCategories?.meta,
	)
}

export const getSubCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { subCategoryId } = req.params
	if (isNaN(Number(subCategoryId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			'Invalid subCategoryId',
		)
		next(error)
		return
	}
	const category = await subCategoryService.getSubCategory(
		Number(subCategoryId),
	)
	if (category instanceof AppError) {
		next(category)
		return
	}
	ResponseHandler.ok(res, category, 'Sub category fetched successfully')
}

export const updateSubCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { subCategoryId } = req.params
	if (isNaN(Number(subCategoryId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			'Invalid subCategoryId',
		)
		next(error)
		return
	}
	const { body } = req
	const subCategory = await subCategoryService.updateSubCategory(
		Number(subCategoryId),
		body,
	)
	if (subCategory instanceof AppError) {
		next(subCategory)
		return
	}
	ResponseHandler.ok(res, null, 'Sub category updated successfully')
}

export const deleteSubCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { subCategoryId } = req.params
	if (isNaN(Number(subCategoryId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			'Invalid subCategoryId',
		)
		next(error)
		return
	}
	const subCategory = await subCategoryService.deleteSubCategory(
		Number(subCategoryId),
	)
	if (subCategory instanceof AppError) {
		next(subCategory)
		return
	}
	ResponseHandler.ok(res, null, 'Sub category deleted successfully')
}

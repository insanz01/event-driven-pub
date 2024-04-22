import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { type SubCategory } from '../../prisma/client'
import { metaPagination } from '../../utils'
import * as categoryRepository from '../categories/categories.repository'

import {
	subCategoriesDTOMapper,
	subCategoryDTOMapper,
} from './sub-categories.mapper'
import * as subCategoryRepository from './sub-categories.repository'

export const createSubCategory = async (data: SubCategory) => {
	const category = await categoryRepository.getCategory(data.categoryId)
	if (!category) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found')
	}
	const subCategory = await subCategoryRepository.createSubCategory(data)
	return subCategory
}

export const getSubCategories = async (
	query: QueryParams & { categoryId?: string },
) => {
	const { page = '1', perPage = '10' } = query
	if (query.categoryId && isNaN(Number(query.categoryId))) {
		return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Invalid categoryId')
	}
	const [categories, totalData] = await Promise.all([
		subCategoryRepository.getSubCategories(query),
		subCategoryRepository.getCountSubCategories(query),
	])

	const meta = metaPagination(
		Number(page),
		Number(perPage),
		categories.length,
		totalData,
	)

	return { data: subCategoriesDTOMapper(categories), meta }
}

export const getSubCategory = async (categoryId: number) => {
	const subCategory = await subCategoryRepository.getSubCategory(categoryId)
	if (!subCategory) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Sub category not found')
	}
	return subCategoryDTOMapper(subCategory)
}

export const updateSubCategory = async (
	categoryId: number,
	data: SubCategory,
) => {
	const subCategory = await subCategoryRepository.getSubCategory(categoryId)
	if (!subCategory) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Sub category not found')
	}
	const category = await categoryRepository.getCategory(data.categoryId)
	if (!category) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found')
	}
	return await subCategoryRepository.updateSubCategory(categoryId, data)
}

export const deleteSubCategory = async (categoryId: number) => {
	const subCategory = await subCategoryRepository.getSubCategory(categoryId)
	if (!subCategory) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Sub category not found')
	}
	return await subCategoryRepository.deleteSubCategory(categoryId)
}

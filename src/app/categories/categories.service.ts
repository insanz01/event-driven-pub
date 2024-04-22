import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { type Category } from '../../prisma/client'
import { metaPagination } from '../../utils'

import { categoriesDTOMapper, categoryDTOMapper } from './categories.mapper'
import * as categoryRepository from './categories.repository'

export const createCategory = async (data: Category) => {
	const category = await categoryRepository.createCategory(data)
	return category
}

export const getCategories = async (query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [categories, totalData] = await Promise.all([
		categoryRepository.getCategories(query),
		categoryRepository.getCountCategories(query),
	])

	const meta = metaPagination(
		Number(page),
		Number(perPage),
		categories.length,
		totalData,
	)

	return { data: categoriesDTOMapper(categories), meta }
}

export const getCategory = async (categoryId: number) => {
	const category = await categoryRepository.getCategory(categoryId)
	if (!category) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found')
	}
	return categoryDTOMapper(category)
}

export const updateCategory = async (categoryId: number, data: Category) => {
	const category = await categoryRepository.getCategory(categoryId)
	if (!category) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found')
	}
	return await categoryRepository.updateCategory(categoryId, data)
}

export const deleteCategory = async (categoryId: number) => {
	const category = await categoryRepository.getCategory(categoryId)
	if (!category) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found')
	}
	return await categoryRepository.deleteCategory(categoryId)
}

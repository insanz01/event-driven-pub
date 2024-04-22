import { type QueryParams } from '../../interface'
import { PrismaClient, type Category } from '../../prisma/client'
import { queryStatus } from '../../utils'

const db = new PrismaClient()

export const createCategory = async (data: Category) => {
	return await db.category.create({
		data: {
			name: data.name,
			isActive: data.isActive,
		},
	})
}

export const getCategories = async (query: QueryParams) => {
	const { page = '1', perPage = '10', search = '', status } = query
	const isActive = queryStatus(status)

	return await db.category.findMany({
		where: {
			name: {
				contains: search,
			},
			isActive,
			deletedAt: null,
		},
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getCountCategories = async (query: QueryParams) => {
	const { search = '', status } = query
	const isActive = queryStatus(status)

	return await db.category.count({
		where: {
			name: {
				contains: search,
			},
			isActive,
			deletedAt: null,
		},
	})
}

export const getCategoriesByIds = async (ids: number[]) => {
	return await db.category.findMany({
		where: {
			id: {
				in: ids,
			},
		},
	})
}

export const getCategory = async (categoryId: number) => {
	return await db.category.findUnique({
		where: {
			id: categoryId,
			deletedAt: null,
		},
	})
}

export const updateCategory = async (categoryId: number, data: Category) => {
	return await db.category.update({
		where: {
			id: categoryId,
		},
		data: {
			name: data.name,
			isActive: data.isActive,
		},
	})
}

export const deleteCategory = async (categoryId: number) => {
	return await db.category.update({
		where: {
			id: categoryId,
		},
		data: {
			isActive: false,
			deletedAt: new Date(),
		},
	})
}

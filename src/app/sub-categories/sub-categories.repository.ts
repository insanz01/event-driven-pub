import { type QueryParams } from '../../interface'
import { PrismaClient, type SubCategory } from '../../prisma/client'
import { queryStatus } from '../../utils'

const db = new PrismaClient()

export const createSubCategory = async (data: SubCategory) => {
	return await db.subCategory.create({
		data: {
			categoryId: data.categoryId,
			name: data.name,
			isActive: data.isActive,
		},
	})
}

export const getSubCategories = async (
	query: QueryParams & { categoryId?: string },
) => {
	const { page = '1', perPage = '10', search = '', status, categoryId } = query
	const isActive = queryStatus(status)

	return await db.subCategory.findMany({
		where: {
			name: {
				contains: search,
			},
			isActive,
			deletedAt: null,
			categoryId: categoryId ? Number(categoryId) : undefined,
		},
		include: {
			category: true,
		},
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getCountSubCategories = async (
	query: QueryParams & { categoryId?: string },
) => {
	const { search = '', status, categoryId } = query
	const isActive = queryStatus(status)

	return await db.subCategory.count({
		where: {
			name: {
				contains: search,
			},
			isActive,
			deletedAt: null,
			categoryId: categoryId ? Number(categoryId) : undefined,
		},
	})
}

export const getSubCategory = async (categoryId: number) => {
	return await db.subCategory.findUnique({
		where: {
			id: categoryId,
		},
		include: {
			category: true,
		},
	})
}

export const updateSubCategory = async (
	categoryId: number,
	data: SubCategory,
) => {
	return await db.subCategory.update({
		where: {
			id: categoryId,
		},
		data: {
			name: data.name,
			isActive: data.isActive,
		},
	})
}

export const deleteSubCategory = async (categoryId: number) => {
	return await db.subCategory.update({
		where: {
			id: categoryId,
		},
		data: {
			isActive: false,
			deletedAt: new Date(),
		},
	})
}

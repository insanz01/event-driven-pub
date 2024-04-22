import { type QueryParams } from '../../interface'
import { PrismaClient, type Roles } from '../../prisma/client'
import { queryStatus } from '../../utils'

const db = new PrismaClient()

export const createRole = async (data: Roles) => {
	return await db.roles.create({
		data: {
			name: data.name,
			isActive: data.isActive,
		},
	})
}

export const getRoles = async (query: QueryParams) => {
	const { page = '1', perPage = '10', search = '', status } = query
	const isActive = queryStatus(status)

	return await db.roles.findMany({
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

export const getCountRoles = async (query: QueryParams) => {
	const { search = '', status } = query
	const isActive = queryStatus(status)

	return await db.roles.count({
		where: {
			name: {
				contains: search,
			},
			isActive,
			deletedAt: null,
		},
	})
}

export const getRolesByIds = async (ids: number[]) => {
	return await db.roles.findMany({
		where: {
			id: {
				in: ids,
			},
		},
	})
}

export const getRole = async (roleId: number) => {
	return await db.roles.findUnique({
		where: {
			id: roleId,
			deletedAt: null,
		},
	})
}

export const updateRole = async (roleId: number, data: Roles) => {
	return await db.roles.update({
		where: {
			id: roleId,
		},
		data: {
			name: data.name,
			isActive: data.isActive,
		},
	})
}

export const deleteRole = async (roleId: number) => {
	return await db.roles.update({
		where: {
			id: roleId,
		},
		data: {
			isActive: false,
			deletedAt: new Date(),
		},
	})
}


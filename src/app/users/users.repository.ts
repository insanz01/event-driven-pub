import { type QueryParams } from '../../interface'
import { PrismaClient, type User } from '../../prisma/client'
import { queryStatus, uuid } from '../../utils'

const db = new PrismaClient()

export const createUser = async (data: User) => {
	return await db.user.create({
		data: {
			id: uuid(),
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
			isActive: data.isActive,
		},
	})
}

export const getUsers = async (query: QueryParams) => {
	const { page = '1', perPage = '10', search = '', status } = query
	const isActive = queryStatus(status)

	return await db.user.findMany({
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

export const getUserByEmail = async (email: string) => {
	return await db.user.findUnique({
		where: {
			email,
		},
	})
}

export const getUserByPhoneNumber = async (phoneNumber: string) => {
	return await db.user.findFirst({
		where: {
			phoneNumber,
		},
	})
}

export const getUserByEmailOrPhoneNumber = async (
	email: string,
	phoneNumber: string,
) => {
	return await db.user.findFirst({
		where: {
			OR: [
				{
					email,
				},
				{
					phoneNumber,
				},
			],
		},
	})
}

export const getCountUsers = async (query: QueryParams) => {
	const { search = '', status } = query
	const isActive = queryStatus(status)

	return await db.user.count({
		where: {
			name: {
				contains: search,
			},
			isActive,
			deletedAt: null,
		},
	})
}

export const getUser = async (userId: string) => {
	return await db.user.findUnique({
		where: {
			id: userId,
		},
	})
}

export const updateUser = async (userId: string, data: User) => {
	return await db.user.update({
		where: {
			id: userId,
		},
		data: {
			name: data.name,
			email: data.email,
			isActive: data.isActive,
		},
	})
}

export const deleteUser = async (userId: string) => {
	return await db.user.update({
		where: {
			id: userId,
		},
		data: {
			deletedAt: new Date(),
		},
	})
}

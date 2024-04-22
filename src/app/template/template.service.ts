import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { type User } from '../../prisma/client'
import { metaPagination } from '../../utils'

import { userDTOMapper, usersDTOMapper } from './template.mapper'
import * as userRepository from './template.repository'

export const createUser = async (data: User) => {
	const user = await userRepository.createUser(data)
	return user
}

export const getUsers = async (query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [users, totalData] = await Promise.all([
		userRepository.getUsers(query),
		userRepository.getCountUsers(query),
	])

	const meta = metaPagination(
		Number(page),
		Number(perPage),
		users.length,
		totalData,
	)

	return { data: usersDTOMapper(users), meta }
}

export const getUser = async (userId: string) => {
	const user = await userRepository.getUser(userId)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'User not found')
	}
	return userDTOMapper(user)
}

export const updateUser = async (userId: string, data: User) => {
	const user = await userRepository.getUser(userId)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'User not found')
	}
	return await userRepository.updateUser(userId, data)
}

export const deleteUser = async (userId: string) => {
	const user = await userRepository.getUser(userId)
	if (!user) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'User not found')
	}
	return await userRepository.deleteUser(userId)
}

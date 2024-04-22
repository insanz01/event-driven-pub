import { type NextFunction, type Request, type Response } from 'express'

import { type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as userService from './users.service'

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const user = await userService.createUser(body)
	if (user instanceof AppError) {
		next(user)
		return
	}
	ResponseHandler.ok(res, null, 'User created successfully')
}

export const getUsers = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const users = await userService.getUsers(query)
	if (users instanceof AppError) {
		next(users)
		return
	}
	ResponseHandler.ok(
		res,
		users?.data,
		'Users fetched successfully',
		users?.meta,
	)
}

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { userId } = req.params
	const user = await userService.getUser(userId)
	if (user instanceof AppError) {
		next(user)
		return
	}
	ResponseHandler.ok(res, user, 'User fetched successfully')
}

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { userId } = req.params
	const { body } = req
	const user = await userService.updateUser(userId, body)
	if (user instanceof AppError) {
		next(user)
		return
	}
	ResponseHandler.ok(res, null, 'User updated successfully')
}

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { userId } = req.params
	const user = await userService.deleteUser(userId)
	if (user instanceof AppError) {
		next(user)
		return
	}
	ResponseHandler.ok(res, null, 'User deleted successfully')
}

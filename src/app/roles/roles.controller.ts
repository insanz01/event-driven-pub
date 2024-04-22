import { type NextFunction, type Request, type Response } from 'express'

import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { MESSAGES, ResponseHandler } from '../../utils'

import * as roleService from './roles.service'

export const createRole = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { body } = req
	const role = await roleService.createRole(body)
	if (role instanceof AppError) {
		next(role)
		return
	}
	ResponseHandler.ok(res, null, MESSAGES.SUCCESS.CREATED.ROLE)
}

export const getRoles = async (
	req: Request & { query: QueryParams },
	res: Response,
	next: NextFunction,
) => {
	const { query } = req
	const roles = await roleService.getRoles(query)
	if (roles instanceof AppError) {
		next(roles)
		return
	}
	ResponseHandler.ok(
		res,
		roles?.data,
		MESSAGES.SUCCESS.GET.ROLE,
		roles?.meta,
	)
}

export const getRole = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { roleId } = req.params
	if (isNaN(Number(roleId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGES.ERROR.INVALID_REQUEST.ROLE_ID,
		)
		next(error)
		return
	}
	const role = await roleService.getRole(Number(roleId))
	if (role instanceof AppError) {
		next(role)
		return
	}
	ResponseHandler.ok(res, role, MESSAGES.SUCCESS.GET.ROLE_DETAIL)
}

export const updateRole = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { roleId } = req.params
	if (isNaN(Number(roleId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGES.ERROR.INVALID_REQUEST.ROLE_ID,
		)
		next(error)
		return
	}
	const { body } = req
	const role = await roleService.updateRole(
		Number(roleId),
		body,
	)
	if (role instanceof AppError) {
		next(role)
		return
	}
	ResponseHandler.ok(res, null, MESSAGES.SUCCESS.UPDATED.ROLE)
}

export const deleteRole = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { roleId } = req.params
	if (isNaN(Number(roleId))) {
		const error = new AppError(
			ERROR_CODE.BAD_REQUEST.code,
			MESSAGES.ERROR.INVALID_REQUEST.ROLE_ID,
		)
		next(error)
		return
	}
	const role = await roleService.deleteRole(Number(roleId))
	if (role instanceof AppError) {
		next(role)
		return
	}
	ResponseHandler.ok(res, null, MESSAGES.SUCCESS.DELETED.ROLE)
}
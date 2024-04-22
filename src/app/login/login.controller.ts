import { type NextFunction, type Request, type Response } from 'express'

import { AppError } from '../../middleware'
import { ResponseHandler } from '../../utils'

import * as authService from './login.service'

export const loginOtp = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const data = await authService.loginWithOtp(request.body)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(response, data, 'Berhasil masuk')
}

export const loginOtpCheck = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const data = await authService.loginOtpCheck(request.body)
	if (data instanceof AppError) {
		next(data)
		return
	}
	ResponseHandler.ok(response, data, 'Berhasil masuk')
}

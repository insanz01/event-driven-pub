import { type NextFunction, type Request, type Response } from 'express'

import { ERROR_CODE } from '../interface'
import { AppError } from '../middleware/error-handler'
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '../prisma/client/runtime/library'

import { handlePrismaError } from './handle-prisma-error'

export const catchAsync =
	(func: any) => (request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(func(request, response, next)).catch((error) => {
			console.log('Error CatchAsync => ', error)
			if (error.isJoi === true) {
				error.status = 400
				error.name = 'Bad Request'
			}
			// handle prisma errors
			if (error instanceof PrismaClientValidationError) {
				console.log('Error Prisma => ', error.message)
				const errorDetails = error.message.split('\n').join(' ')
				const errorMessage = `Database request failed: ${errorDetails}`
				const err = new AppError(ERROR_CODE.BAD_REQUEST.code, errorMessage)
				next(err)
				return
			}
			if (error instanceof PrismaClientKnownRequestError) {
				console.log('Error Prisma Client => ', error)
				const errorMessage = `${error.code} - ${handlePrismaError(error)}`
				const err = new AppError(ERROR_CODE.BAD_REQUEST.code, errorMessage)
				next(err)
				return
			}
			next(error)
		})
	}

import { type NextFunction, type Request, type Response } from 'express'

import { ResponseHandler } from '../../utils'

import { sendData } from './sample.service'

export const sendMessage = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const data = {
		title: 'Harry Potter and the Chamber of Secrets',
		author: 'J.K. Rowling',
	}

	const isSuccess = await sendData(data)
	if (!isSuccess) {
		next(new Error('Something went wrong'))
		return
	}

	ResponseHandler.ok(response, data, 'Berhasil masuk')
}

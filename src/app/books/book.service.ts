import { channel } from 'src/config/amqp'
import { ERROR_CODE } from 'src/interface'
import { AppError } from 'src/middleware'

import * as bookRepository from './book.repository'

const sendData = async (topic: string, data: any) => {
	channel.sendToQueue(topic, Buffer.from(JSON.stringify(data)))

	// await channel.close()
	// await connection.close()
}

export const createBook = async (data: any) => {
	const book = await bookRepository.save(data.title, data.author, data.volume)

	if (!book) {
		throw new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			'Something went wrong',
		)
	}

	await sendData('books:store', {
		bookId: book.id,
		title: book.title,
		author: book.author,
		volume: book.volume,
	})

	return book
}

export const getBooks = async () => {
	return await bookRepository.getAll()
}

export const updateBook = async (id: number, data: any) => {
	const book = await bookRepository.update(id, data)

	if (!book) {
		throw new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			'Something went wrong',
		)
	}

	await sendData('books:update', {
		bookId: book.id,
		title: book.title,
		author: book.author,
		volume: book.volume,
	})

	return book
}

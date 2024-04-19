import { ERROR_CODE } from 'src/interface'
import { AppError } from 'src/middleware'

import { sendData } from './book.publisher'
import * as bookRepository from './book.repository'

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

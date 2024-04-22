import { channel } from '../../config/amqp'

import * as bookRepository from './book.repository'

export const subscribeBookStore = async () => {
	try {
		await channel
			.consume('books:store', async (data: any) => {
				console.log('Data received :', Buffer.from(data.content).toString())

				const book = JSON.parse(Buffer.from(data.content).toString())
				await bookRepository.save(book)

				channel.ack(data)
			})
			.catch((error) => {
				console.log('error', error)
			})
	} catch (error) {
		console.log('error', error)
	}
}

export const subscribeBookUpdate = async () => {
	try {
		await channel
			.consume('books:update', async (data: any) => {
				console.log('Data received :', Buffer.from(data.content).toString())

				const book = JSON.parse(Buffer.from(data.content).toString())
				await bookRepository.update(book)

				channel.ack(data)
			})
			.catch((error) => {
				console.log('error_1', error)
			})
	} catch (error) {
		console.log('error_2', error)
	}
}

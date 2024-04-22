import { channel } from '../../config/amqp'

import * as productRepository from './product.repository'

export const subscribeProductStore = async () => {
	try {
		await channel
			.consume('product:store', async (data: any) => {
				console.log('Data received: ', Buffer.from(data.content).toString())

				const product = JSON.parse(Buffer.from(data.content).toString())
				// const product = {
				// 	productId: 100,
				// 	name: 'Teh Kotak',
				// 	quantity: 8,
				// 	price: 2000,
				// }
				const result = await productRepository.save(product)

				if (!result) {
					throw Error(result)
				}

				channel.ack(product)
			})
			.catch((error) => {
				console.log('error: ', error)
			})
	} catch (error) {
		console.log('error: ', error)
	}
}

export const subscribeProductUpdate = async () => {
	try {
		await channel
			.consume('product:update', async (data: any) => {
				console.log('Data received: ', Buffer.from(data.content).toString())

				const product = JSON.parse(Buffer.from(data.content).toString())
				await productRepository.update(product)

				channel.ack(product)
			})
			.catch((error) => {
				console.log('error: ', error)
			})
	} catch (error) {
		console.log('error: ', error)
	}
}

export const subscribeProductDelete = async () => {
	try {
		await channel
			.consume('product:delete', async (data: any) => {
				console.log('Data received: ', Buffer.from(data.content).toString())

				const productId = JSON.parse(Buffer.from(data.content).toString())
				await productRepository.drop(productId)

				channel.ack(productId)
			})
			.catch((error) => {
				console.log('error: ', error)
			})
	} catch (error) {
		console.log('error: ', error)
	}
}

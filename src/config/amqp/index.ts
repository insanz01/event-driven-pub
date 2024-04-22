import {
	subscribeBookStore,
	subscribeBookUpdate,
} from '../../app/books/book.subscriber'
import {
	subscribeProductStore,
	subscribeProductUpdate,
	subscribeProductDelete,
} from '../../app/products/product.subscriber'

import { connectAMQP } from './amqp'

export * from './amqp'

export const initAMQP = async () => {
	try {
		await connectAMQP()

		// register subscriber
		await subscribeBookStore()
		await subscribeBookUpdate()

		await subscribeProductStore()
		await subscribeProductUpdate()
		await subscribeProductDelete()
	} catch (error) {
		console.log(error)
	}
}

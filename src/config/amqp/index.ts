import { AMQP } from './amqp'

export * from './amqp'

export const initAMQP = async () => {
	try {
		const amqp = new AMQP()
		await amqp.init()

		await amqp.registerQueue('books:store')
		await amqp.registerQueue('books:update')

		// register subscriber
	} catch (error) {
		console.log(error)
	}
}

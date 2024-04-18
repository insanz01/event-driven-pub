import { connectAMQP } from './amqp'

export * from './amqp'

export const initAMQP = async () => {
	try {
		await connectAMQP()
	} catch (error) {
		console.log(error)
	}
}

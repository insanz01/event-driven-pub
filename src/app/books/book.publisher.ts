import { AMQP } from 'src/config/amqp'

export const sendData = async (topic: string, data: any) => {
	await AMQP.sendToQueue(topic, data)
}

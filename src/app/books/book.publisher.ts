import { channel } from 'src/config/amqp'

export const sendData = async (topic: string, data: any) => {
	channel.sendToQueue(topic, Buffer.from(JSON.stringify(data)))
}

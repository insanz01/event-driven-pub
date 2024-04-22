import axios from 'axios'

export const apiSendToWhatsApp = async (
	phoneNumber: string,
	message: string,
): Promise<void> => {
	let data
	try {
		data = await axios.post('https://jarvis.prawito.com/send-message', {
			number: phoneNumber,
			message,
		})
	} catch (error) {
		console.log(
			`Mengirim data ke api wa bot tidak dapat dilakukan. phone: ${phoneNumber}`,
		)
	}
	console.log('Message sent:', data)
}

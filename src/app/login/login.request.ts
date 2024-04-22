import Joi from 'joi'

import { generalMessage } from '../../utils'

export const loginOtpSchema = Joi.object({
	type: Joi.string()
		.valid('WHATSAPP', 'SMS')
		.required()
		.messages(generalMessage),
	phoneNumber: Joi.string().empty('').messages(generalMessage),
	email: Joi.string().empty('').messages(generalMessage),
})

export const loginOtpCheckSchema = Joi.object({
	token: Joi.string().required().messages(generalMessage),
	otp: Joi.string().required().messages(generalMessage),
})

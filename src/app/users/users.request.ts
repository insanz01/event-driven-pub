import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createUserSchema = Joi.object({
	name: Joi.string().required().messages(joiGeneralMessage),
	email: Joi.string().email().required().messages(joiGeneralMessage),
	isActive: Joi.boolean().required().messages(joiGeneralMessage),
})

export const updateUserSchema = Joi.object({
	name: Joi.string().optional().messages(joiGeneralMessage),
	email: Joi.string().optional().email().messages(joiGeneralMessage),
	isActive: Joi.boolean().optional().messages(joiGeneralMessage),
})

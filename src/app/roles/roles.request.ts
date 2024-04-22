import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createRoleSchema = Joi.object({
	name: Joi.string().required().messages(joiGeneralMessage),
	isActive: Joi.boolean().required().messages(joiGeneralMessage),
})

export const updateRoleSchema = Joi.object({
	name: Joi.string().optional().messages(joiGeneralMessage),
	isActive: Joi.boolean().optional().messages(joiGeneralMessage),
})

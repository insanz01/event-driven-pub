import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createCategorySchema = Joi.object({
	name: Joi.string().required().messages(joiGeneralMessage),
	isActive: Joi.boolean().required().messages(joiGeneralMessage),
})

export const updateCategorySchema = Joi.object({
	name: Joi.string().optional().messages(joiGeneralMessage),
	isActive: Joi.boolean().optional().messages(joiGeneralMessage),
})

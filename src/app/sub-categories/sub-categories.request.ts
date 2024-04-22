import Joi from 'joi'

import { joiGeneralMessage } from '../../utils'

export const createSubCategorySchema = Joi.object({
	categoryId: Joi.number().required().messages(joiGeneralMessage),
	name: Joi.string().required().messages(joiGeneralMessage),
	isActive: Joi.boolean().required().messages(joiGeneralMessage),
})

export const updateSubCategorySchema = Joi.object({
	categoryId: Joi.string().optional().messages(joiGeneralMessage),
	name: Joi.string().optional().messages(joiGeneralMessage),
	isActive: Joi.boolean().optional().messages(joiGeneralMessage),
})

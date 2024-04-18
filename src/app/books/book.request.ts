import Joi from 'joi'
import { generalMessage } from 'src/utils'

export const bookCreateSchema = Joi.object({
	title: Joi.string().required().messages(generalMessage),
	author: Joi.string().required().messages(generalMessage),
	volume: Joi.number().required().messages(generalMessage),
})

export const updateCreateSchema = Joi.object({
	title: Joi.string().required().messages(generalMessage),
	author: Joi.string().required().messages(generalMessage),
	volume: Joi.number().required().messages(generalMessage),
})

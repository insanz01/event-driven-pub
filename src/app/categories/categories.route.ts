import { Router } from 'express'

import { validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'

import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategory,
	updateCategory,
} from './categories.controller'
import {
	createCategorySchema,
	updateCategorySchema,
} from './categories.request'

const route = Router()

route.post(
	'/',
	validateRequest(createCategorySchema),
	catchAsync(createCategory),
)
route.get('/', catchAsync(getCategories))
route.get('/:categoryId', catchAsync(getCategory))
route.patch(
	'/:categoryId',
	validateRequest(updateCategorySchema),
	catchAsync(updateCategory),
)
route.delete('/:categoryId', catchAsync(deleteCategory))

export default route

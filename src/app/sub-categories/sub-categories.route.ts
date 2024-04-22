import { Router } from 'express'

import { validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'

import {
	createSubCategory,
	deleteSubCategory,
	getSubCategories,
	getSubCategory,
	updateSubCategory,
} from './sub-categories.controller'
import {
	createSubCategorySchema,
	updateSubCategorySchema,
} from './sub-categories.request'

const route = Router()

route.post(
	'/',
	validateRequest(createSubCategorySchema),
	catchAsync(createSubCategory),
)
route.get('/', catchAsync(getSubCategories))
route.get('/:subCategoryId', catchAsync(getSubCategory))
route.patch(
	'/:subCategoryId',
	validateRequest(updateSubCategorySchema),
	catchAsync(updateSubCategory),
)
route.delete('/:subCategoryId', catchAsync(deleteSubCategory))

export default route

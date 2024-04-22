import { Router } from 'express'

import { validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'

import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from './users.controller'
import { createUserSchema, updateUserSchema } from './users.request'

const route = Router()

route.post('/', validateRequest(createUserSchema), catchAsync(createUser))
route.get('/', catchAsync(getUsers))
route.get('/:userId', catchAsync(getUser))
route.patch(
	'/:userId',
	validateRequest(updateUserSchema),
	catchAsync(updateUser),
)
route.delete('/:userId', catchAsync(deleteUser))

export default route

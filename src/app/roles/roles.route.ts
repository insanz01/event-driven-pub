import { Router } from 'express'

import { validateRequest } from '../../middleware'
import { catchAsync } from '../../utils'

import {
	getRoles,
	getRole,
	createRole,
	updateRole,
	deleteRole,
} from './roles.controller'
import {
	createRoleSchema,
	updateRoleSchema,
} from './roles.request'

const route = Router()

route.post(
	'/',
	validateRequest(createRoleSchema),
	catchAsync(createRole),
)
route.get('/', catchAsync(getRoles))
route.get('/:roleId', catchAsync(getRole))
route.patch(
	'/:roleId',
	validateRequest(updateRoleSchema),
	catchAsync(updateRole),
)
route.delete('/:roleId', catchAsync(deleteRole))

export default route

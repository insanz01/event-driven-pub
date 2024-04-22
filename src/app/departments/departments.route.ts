// import { Router } from 'express'

// import { validateRequest } from '../../middleware'
// import { catchAsync } from '../../utils'

// import {
// 	getDepartments,
// 	getDepartment,
// 	createDepartment,
// 	updateDepartment,
// 	deleteDepartment,
// } from './departments.controller'
// import {
// 	createDepartmentSchema,
// 	updateDepartmentSchema,
// } from './departments.request'

// const route = Router()

// route.post(
// 	'/',
// 	validateRequest(createDepartmentSchema),
// 	catchAsync(createDepartment),
// )

// route.get('/', catchAsync(getDepartments))
// route.get('/:departmentId', catchAsync(getDepartment))

// route.patch(
// 	'/:departmentId',
// 	validateRequest(updateDepartmentSchema),
// 	catchAsync(updateDepartment),
// )

// route.delete('/:departmentId', catchAsync(deleteDepartment))

// export default route

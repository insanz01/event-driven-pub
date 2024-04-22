// import { type NextFunction, type Request, type Response } from 'express'

// import { ERROR_CODE, type QueryParams } from '../../interface'
// import { AppError } from '../../middleware'
// import { ResponseHandler, MESSAGES } from '../../utils'

// import * as departmentService from './departments.service'

// export const getDepartments = async (
// 	req: Request & { query: QueryParams },
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	const { query } = req
// 	const departments = await departmentService.getDepartments(query)
// 	if (departments instanceof AppError) {
// 		next(departments)
// 		return
// 	}
// 	ResponseHandler.ok(
// 		res,
// 		departments?.data,
// 		MESSAGES.SUCCESS.GET.DEPARTMENTS,
// 		departments?.meta,
// 	)
// }

// export const getDepartment = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	const { departmentId } = req.params
// 	if (isNaN(Number(departmentId))) {
// 		const error = new AppError(
// 			ERROR_CODE.BAD_REQUEST.code,
// 			MESSAGES.ERROR.INVALID_REQUEST.DEPARTMENT_ID,
// 		)
// 		next(error)
// 		return
// 	}
// 	const department = await departmentService.getDepartment(Number(departmentId))
// 	if (department instanceof AppError) {
// 		next(department)
// 		return
// 	}
// 	ResponseHandler.ok(res, department, MESSAGES.SUCCESS.GET.DEPARTMENT_DETAIL)
// }

// export const createDepartment = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	const { body } = req
// 	const department = await departmentService.createDepartment(body)
// 	if (department instanceof AppError) {
// 		next(department)
// 		return
// 	}
// 	ResponseHandler.created(res, department, MESSAGES.SUCCESS.CREATED.DEPARTMENT)
// }

// export const updateDepartment = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	const { departmentId } = req.params
// 	const { body } = req
// 	if (isNaN(Number(departmentId))) {
// 		const error = new AppError(
// 			ERROR_CODE.BAD_REQUEST.code,
// 			MESSAGES.ERROR.INVALID_REQUEST.DEPARTMENT_ID,
// 		)
// 		next(error)
// 		return
// 	}
// 	const department = await departmentService.updateDepartment(
// 		Number(departmentId),
// 		body,
// 	)
// 	if (department instanceof AppError) {
// 		next(department)
// 		return
// 	}
// 	ResponseHandler.ok(res, department, MESSAGES.SUCCESS.UPDATED.DEPARTMENT)
// }

// export const deleteDepartment = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	const { departmentId } = req.params
// 	if (isNaN(Number(departmentId))) {
// 		const error = new AppError(
// 			ERROR_CODE.BAD_REQUEST.code,
// 			MESSAGES.ERROR.INVALID_REQUEST.DEPARTMENT_ID,
// 		)
// 		next(error)
// 		return
// 	}
// 	const department = await departmentService.deleteDepartment(Number(departmentId))
// 	if (department instanceof AppError) {
// 		next(department)
// 		return
// 	}
// 	ResponseHandler.ok(res, department, MESSAGES.SUCCESS.DELETED.DEPARTMENT)
// }

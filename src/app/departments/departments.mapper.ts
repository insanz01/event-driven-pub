// import {
// 	type DepartmentManagements,
// 	TitleOfDepartments,
// 	type Departments,
// } from '../../prisma/client'

// import { type DepartmentDTO } from './departments.dto'

// export interface DepartmentDTOMapper extends Departments {
// 	DepartmentManagement: DepartmentManagements[]
// }

// export const departmentDTOMapper = (
// 	department: DepartmentDTOMapper,
// ): DepartmentDTO => {
// 	console.log(department)
// 	return {
// 		id: department.id,
// 		name: department.name,
// 		isActive: department.isActive,
// 		departmentManagement: department.DepartmentManagement.map(
// 			(departmentManagement) => {
// 				return {
// 					id: departmentManagement.id,
// 					divisionId: departmentManagement.divisionId,
// 					isProfitCenter: departmentManagement.isProfitCenter,
// 					isActive: departmentManagement.isActive,
// 					title: {
// 						id: departmentManagement.title.id,
// 						name: departmentManagement.title.name,
// 						isLeader: departmentManagement.title.isLeader,
// 						isActive: departmentManagement.title.isActive,
// 					},
// 				}
// 			},
// 		),
// 	}
// }

// export const departmentsDTOMapper = (
// 	departments: DepartmentDTOMapper[],
// ): DepartmentDTO[] => {
// 	return departments.map((department) => departmentDTOMapper(department))
// }

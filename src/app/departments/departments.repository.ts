// import { type QueryParams } from '../../interface'
// import { PrismaClient, type Departments, DepartmentManagements } from '../../prisma/client'
// import { queryStatus } from '../../utils'

// const db = new PrismaClient()

// export const getDepartments = async (query: QueryParams) => {
// 	const { page = '1', perPage = '10', search = '' } = query

// 	return await db.departments.findMany({
// 		where: {
// 			name: {
// 				contains: search,
// 			},
// 			deletedAt: null,
// 		},
// 		include: {
// 			DepartmentManagement: {
// 				include: {
// 					title: true,
// 				}
// 			}
// 		},
// 		skip: (Number(page) - 1) * Number(perPage),
// 		take: Number(perPage),
// 	})
// }

// export const getCountDepartments = async (query: QueryParams) => {
// 	const { search = '' } = query

// 	return await db.departments.count({
// 		where: {
// 			name: {
// 				contains: search,
// 			},
// 			deletedAt: null,
// 		},
// 	})

// }

// export const getDepartment = async (departmentId: number) => {
// 	return await db.departments.findUnique({
// 		where: {
// 			id: departmentId,
// 		},
// 		include: {
// 			DepartmentManagement: {
// 				include: {
// 					title: true,
// 				}
// 			}
// 		}
// 	})
// }

// export const createDepartment = async (data: any) => {
// 	const department = await db.departments.create({
// 		data: {
// 			name: data.name,
// 			isActive: data.isActive,
// 			DepartmentManagement: {
// 				create: [{
// 					title: {
// 						create: {
// 							name: data.titleName,
// 							isActive: data.isActive,
// 							isLeader: data.isLeader,
// 						},
// 					},
// 					divisionId: data.divisionId,
// 					isActive: data.isActive,
// 					isProfitCenter: data.isProfitCenter,
// 				}],
// 			},
// 		},
// 		include: {
// 			DepartmentManagement: {
// 				include: {
// 						title: true,
// 				},
// 			},
// 		},
// 	});

// 	return department;
// };

// export const updateDepartment = async (departmentId: number, data: any) => {
// 	return await db.departments.update({
// 		where: {
// 			id: departmentId,
// 		},
// 		data: {
// 			name: data.name,
// 			isActive: data.isActive,
// 			DepartmentManagement: {
// 				create: [{
// 					title: {
// 						create: {
// 							name: data.titleName,
// 							isActive: data.isActive,
// 							isLeader: data.isLeader,
// 						},
// 					},
// 					divisionId: data.divisionId,
// 					isActive: data.isActive,
// 					isProfitCenter: data.isProfitCenter,
// 				}],
// 			},
// 		},
// 		include: {
// 			DepartmentManagement: {
// 				include: {
// 						title: true,
// 				},
// 			},
// 		},
// 	})
// }

// export const deleteDepartment = async (departmentId: number) => {
// 	return await db.departments.update({
// 		where: {
// 			id: departmentId,
// 		},
// 		data: {
// 			deletedAt: new Date(),
// 			isActive: false,
// 			// delete department management and title of department too
// 			DepartmentManagement: {
// 				update: {
// 					where: {
// 						departmentId: departmentId,
// 					},
// 					data: {
// 						deletedAt: new Date(),
// 						isActive: false,
// 						title: {
// 							update: {
// 								where: {
// 									departmentId: departmentId,
// 								},
// 								data: {
// 									deletedAt: new Date(),
// 									isActive: false,
// 								},
// 							},
// 						},
// 					},
// 				},
// 			},
// 		},
// 	})
// }

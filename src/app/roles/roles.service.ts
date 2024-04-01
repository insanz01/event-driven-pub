import { ERROR_CODE, type QueryParams } from '../../interface'
import { AppError } from '../../middleware'
import { type Roles } from '../../prisma/client'
import { metaPagination } from '../../utils'

import { rolesDTOMapper, roleDTOMapper } from './roles.mapper'
import * as roleRepository from './roles.repository'

export const getRoles = async (query: QueryParams) => {
	const { page = '1', perPage = '10' } = query
	const [roles, totalData] = await Promise.all([
		roleRepository.getRoles(query),
		roleRepository.getCountRoles(query),
	])

	const meta = metaPagination(
		Number(page),
		Number(perPage),
		roles.length,
		totalData,
	)

	return { data: rolesDTOMapper(roles), meta }
}

export const getRole = async (roleId: number) => {
	const role = await roleRepository.getRole(roleId)
	if (!role) {
		return new AppError(ERROR_CODE.NOT_FOUND.code, 'Role not found')
	}
	return roleDTOMapper(role)
}

import { type Roles } from '../../prisma/client'

import { type RoleDTO } from './roles.dto'

export const rolesDTOMapper = (roles: Roles[]): RoleDTO[] => {
	return roles.map((role) => {
		return {
			id: role.id,
			name: role.name,
			isActive: role.isActive,
		}
	})
}

export const roleDTOMapper = (role: Roles): RoleDTO => {
	return {
		id: role.id,
		name: role.name,
		isActive: role.isActive,
	}
}

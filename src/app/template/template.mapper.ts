import { type User } from '../../prisma/client'

import { type UserDTO } from './template.dto'

export const usersDTOMapper = (users: User[]): UserDTO[] => {
	return users.map((user) => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			isActive: user.isActive,
		}
	})
}

export const userDTOMapper = (user: User): UserDTO => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		isActive: user.isActive,
	}
}

import { type Category } from '../../prisma/client'

import { type CategoryDTO } from './categories.dto'

export const categoriesDTOMapper = (categories: Category[]): CategoryDTO[] => {
	return categories.map((category) => {
		return {
			id: category.id,
			name: category.name,
			isActive: category.isActive,
		}
	})
}

export const categoryDTOMapper = (category: Category): CategoryDTO => {
	return {
		id: category.id,
		name: category.name,
		isActive: category.isActive,
	}
}

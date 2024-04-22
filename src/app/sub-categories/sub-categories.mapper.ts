import { type Category, type SubCategory } from '../../prisma/client'

import { type SubCategoryDTO } from './sub-categories.dto'

interface SubCategoryMapper extends SubCategory {
	category: Category
}

export const subCategoriesDTOMapper = (
	subCategories: SubCategoryMapper[],
): SubCategoryDTO[] => {
	return subCategories.map((subCategory) => {
		return {
			id: subCategory.id,
			name: subCategory.name,
			isActive: subCategory.isActive,
			category: {
				id: subCategory.category.id,
				name: subCategory.category.name,
				isActive: subCategory.category.isActive,
			},
		}
	})
}

export const subCategoryDTOMapper = (
	subCategory: SubCategoryMapper,
): SubCategoryDTO => {
	return {
		id: subCategory.id,
		name: subCategory.name,
		isActive: subCategory.isActive,
		category: {
			id: subCategory.category.id,
			name: subCategory.category.name,
			isActive: subCategory.category.isActive,
		},
	}
}

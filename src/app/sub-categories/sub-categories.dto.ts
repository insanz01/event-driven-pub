export interface SubCategoryDTO {
	id: number
	name: string
	isActive: boolean | null
	category: {
		id: number
		name: string
		isActive: boolean | null
	}
}

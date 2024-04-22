import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'

import * as productRepository from './product.repository'

export const getProducts = async () => {
	return await productRepository.getAll()
}

export const getProduct = async (productId: number) => {
	const result = await productRepository.get(productId)

	if (!result) {
		throw new AppError(ERROR_CODE.NOt_FOUND.code, 'Product not found')
	}

	return result
}

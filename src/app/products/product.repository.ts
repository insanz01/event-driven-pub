import { PrismaClient } from '../../prisma/client'

const db = new PrismaClient()

export const save = async (product: any) => {
	return await db.product.create({
		data: {
			...product,
		},
	})
}

export const getAll = async () => {
	return await db.product.findMany()
}

export const get = async (productId: number) => {
	return await db.product.findUnique({
		where: {
			productId,
		},
	})
}

export const update = async (product: any) => {
	return await db.product.update({
		where: {
			productId: product.productId,
		},
		data: {
			...product,
		},
	})
}

export const drop = async (productId: number) => {
	return await db.product.delete({
		where: {
			productId,
		},
		select: {
			productId: true,
		},
	})
}

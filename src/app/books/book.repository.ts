import { PrismaClient } from 'src/prisma/client'

const db = new PrismaClient()

export const save = async (title: string, author: string, volume: number) => {
	return await db.book.create({
		data: {
			title,
			author,
			volume,
		},
	})
}

export const getAll = async () => {
	return await db.book.findMany()
}

export const update = async (id: number, data: any) => {
	return await db.book.update({
		where: {
			id,
		},
		data,
	})
}

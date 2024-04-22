import { PrismaClient } from '../../prisma/client'

const db = new PrismaClient()

export const save = async (book: any) => {
	return await db.book.create({
		data: {
			...book,
		},
	})
}

export const getAll = async () => {
	return await db.book.findMany()
}

export const update = async (book: any) => {
	return await db.book.update({
		where: {
			bookId: book.bookId,
		},
		data: {
			...book,
		},
	})
}

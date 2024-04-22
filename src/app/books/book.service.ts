import * as bookRepository from './book.repository'

export const getBooks = async () => {
	return await bookRepository.getAll()
}

import { Router } from 'express'
import { validateRequest } from 'src/middleware'
import { catchAsync } from 'src/utils'

import { getAllBooks, storeBook, updateBook } from './book.controller'
import { bookCreateSchema } from './book.request'

const route = Router()

route.get('/', catchAsync(getAllBooks))
route.post('/', validateRequest(bookCreateSchema), catchAsync(storeBook))
route.put('/:id', validateRequest(bookCreateSchema), catchAsync(updateBook))

export default route

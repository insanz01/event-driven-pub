import { Router } from 'express'

import { catchAsync } from '../../utils'

import { getProduct, getProducts } from './product.controller'

const route = Router()

route.get('/', catchAsync(getProducts))
route.get('/:id', catchAsync(getProduct))

export default route

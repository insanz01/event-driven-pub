import { Router } from 'express'

import { validateRequest } from '../../middleware'
import { catchAsync, limiter } from '../../utils'

import { loginOtp, loginOtpCheck } from './login.controller'
import { loginOtpCheckSchema, loginOtpSchema } from './login.request'
const route = Router()

route.post(
	'/otp',
	limiter,
	validateRequest(loginOtpSchema),
	catchAsync(loginOtp),
)

route.post(
	'/otp/check',
	validateRequest(loginOtpCheckSchema),
	catchAsync(loginOtpCheck),
)

export default route

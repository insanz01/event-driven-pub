import bcrypt from 'bcrypt'

import { ERROR_CODE } from '../../interface'
import { AppError } from '../../middleware'
import {
	apiSendToWhatsApp,
	generateUUID,
	generateAuthToken,
	generateRefreshToken,
} from '../../utils'
import * as otpRepository from '../otps/otp.repository'
import * as userRepository from '../users/users.repository'

import { type LoginOtp, type LoginOtpCheck } from './login.interface'

async function verifyOtp(inputOtp: string, hashedOtp: string) {
	const match = await bcrypt.compare(inputOtp, hashedOtp)
	return match
}

export const getRandomOtp = () => Math.floor(100000 + Math.random() * 900000)

async function hashOtp(otp: string) {
	const saltRounds = 10
	const hashedOtp = await bcrypt.hash(otp, saltRounds)
	return hashedOtp
}

export const loginOtpWhatsapp = async (phoneNumber: string) => {
	const user = await userRepository.getUserByPhoneNumber(phoneNumber)
	if (!user) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			'Pengguna tidak ada, pengguna tidak ditemukan',
		)
	}

	const otp = getRandomOtp()
	const token = generateUUID()
	const expiry = new Date(Date.now() + 5 * 60 * 1000) // 5 minute
	const hashedOtp = await hashOtp(otp.toString())

	await otpRepository.setOtp('', phoneNumber, hashedOtp, token, expiry)

	const message = `TUV NORD CENTRAL OTP \nKODE OTP : *${otp}* \nDemi keamanan, jangan bagikan kode ini.`
	await apiSendToWhatsApp(user.phoneNumber, message)

	return { token }
}

export const loginWithOtp = async ({ phoneNumber, email, type }: LoginOtp) => {
	switch (type) {
		case 'WHATSAPP':
			return await loginOtpWhatsapp(phoneNumber)
		case 'EMAIL':
			break
		default:
			return new AppError(ERROR_CODE.NOT_FOUND.code, 'Type OTP tidak valid')
	}
}

export const loginOtpCheck = async ({ token, otp }: LoginOtpCheck) => {
	const result = await otpRepository.getOtp(token)
	if (!result) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			'Token atau otp anda tidak valid!',
		)
	}

	const isOtpValid = await verifyOtp(otp, result.otp)
	if (!isOtpValid) {
		return new AppError(ERROR_CODE.UNAUTHORIZED.code, 'Otp tidak valid!')
	}

	if (result.expiry == null) {
		await otpRepository.deleteOtp(token)
		return new AppError(ERROR_CODE.UNAUTHORIZED.code, 'Otp sudah kadaluarsa!')
	}

	if (result.expiry < new Date()) {
		await otpRepository.deleteOtp(token)
		return new AppError(ERROR_CODE.UNAUTHORIZED.code, 'Otp sudah kadaluarsa!')
	}

	const email = result.email
	const phoneNumber = result.phoneNumber

	const user = await userRepository.getUserByEmailOrPhoneNumber(
		email,
		phoneNumber,
	)
	if (!user) {
		return new AppError(
			ERROR_CODE.NOT_FOUND.code,
			'Pengguna tidak ada, pengguna tidak ditemukan',
		)
	}

	await otpRepository.deleteOtp(token)

	return {
		authToken: generateAuthToken(user),
		refreshToken: generateRefreshToken(user),
	}
}

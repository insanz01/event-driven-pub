import { PrismaClient } from '../../prisma/client'

const db = new PrismaClient()

export const setOtp = async (
	email: string,
	phoneNumber: string,
	otp: string,
	token: string,
	expiry: Date,
) => {
	return await db.otp.create({
		data: {
			email,
			phoneNumber,
			otp,
			token,
			expiry,
		},
	})
}

export const getOtp = async (token: string) => {
	return await db.otp.findFirst({
		where: {
			token,
		},
	})
}

export const deleteOtp = async (token: string) => {
	return await db.otp.delete({
		where: {
			token,
		},
	})
}

import jwt from 'jsonwebtoken'

import { type User } from '../prisma/client'
import config from '../utils/config'

export const generateAccessToken = (
	userId: string,
	roleName: string,
	entityId: string,
	businessId: string,
): string => {
	const expiredDays = 1
	const expiredSecond = expiredDays * 24 * 60 * 60
	const expired = Math.floor(new Date().getTime() / 1000.0) + expiredSecond
	return generateToken({
		payload: {
			type: 'ACCESS',
			userId,
			role: roleName,
			entityId,
			businessId,
		},
		expired,
		secretKey: config.jwt.accessPrivateKey,
	})
}

export const generateAuthToken = (user: User): string => {
	const expiredDays = 1
	const expired = expiredDays * 24 * 60 * 60
	return generateToken({
		payload: {
			type: 'AUTH',
			userId: user.id,
		},
		expired,
		secretKey: config.jwt.accessPrivateKey,
	})
}

export const generateRefreshToken = (user: User): string => {
	const expiredDays = 14
	const expired = expiredDays * 24 * 60 * 60
	return generateToken({
		payload: {
			type: 'REFRESH',
			userId: user.id,
		},
		expired,
		secretKey: config.jwt.accessPrivateKey,
	})
}

interface TokenPayload {
	payload: any
	expired: number
	secretKey: string
}

const generateToken = ({
	payload,
	secretKey,
	expired,
}: TokenPayload): string => {
	const iat = Math.floor(new Date().getTime() / 1000.0)
	const exp = iat + expired

	return jwt.sign({ ...payload, iat, exp }, secretKey)
}

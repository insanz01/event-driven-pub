import dotenv from 'dotenv'

dotenv.config()

const config = {
	url: process.env.APP_URL ?? 'https://dc-system.hsd-api.com',
	port: process.env.PORT,
	env: process.env.APP_ENV,
	jwt: {
		accessPrivateKey: process.env.JWT_ACCESS_PRIVATE_KEY ?? 'default',
		refreshPrivateKey: process.env.JWT_REFRESH_PRIVATE_KEY ?? 'default',
	},
	google: {
		auth: {
			clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? 'default',
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? 'default',
		},
	},
	client: {
		loginSuccessPath: process.env.CLIENT_LOGIN_SUCCESS_PATH ?? '/',
		loginFailedPath: process.env.CLIENT_LOGIN_FAILED_PATH ?? '/',
		allowedDomains: process.env.CLIENT_ALLOWED_DOMAINS?.split('|') ?? [],
	},
}

export default config

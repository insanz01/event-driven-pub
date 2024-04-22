export interface LoginOtp {
	type: 'EMAIL' | 'WHATSAPP'
	phoneNumber: string
	email: string
}

export interface LoginOtpCheck {
	otp: string
	token: string
}

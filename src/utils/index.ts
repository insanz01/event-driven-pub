import { v4 as uuidv4 } from 'uuid'

export * from './catch-async'
export * from './clean-joi-error-message'
export * from './handle-prisma-error'
export * from './meta-pagination'
export * from './query-status'
export * from './response-handler'
export * from './generate-id'
export * from './messages'
export * from './token'
export * from './whatsapp'
export * from './validation-message'
export * from './rate-limit'

export const generateUUID = () => {
	return uuidv4()
}

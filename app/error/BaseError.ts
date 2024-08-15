import { ErrorCodes } from './ErrorCodes'

export class BaseError extends Error {
	readonly code: ErrorCodes
	readonly title: string
	readonly description: string
	readonly showToUser: boolean
	readonly debugInfo: string

	constructor(code: ErrorCodes, title: string, description: string, showToUser: false, debugInfo = '') {
		super(`${title}: ${description}`)
		;(this.code = code),
			(this.title = title),
			(this.description = description),
			(this.showToUser = showToUser),
			(this.debugInfo = debugInfo)
	}
}

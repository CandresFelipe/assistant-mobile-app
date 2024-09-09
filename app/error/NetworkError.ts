import { BaseError } from './BaseError'
import { ErrorCodes } from './ErrorCodes'

export class NetworkError extends BaseError {
	constructor(message: string, code: string) {
		super(ErrorCodes.NetworkError, 'Network Error', 'Server is not current reachable', true, `${message} code: ${code}`)
	}
}

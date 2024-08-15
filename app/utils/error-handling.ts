import { ApiError } from '@/error/ApiError'
import { BaseError } from '@/error/BaseError'
import { ErrorCodes } from '@/error/ErrorCodes'

export function isBaseError(error: unknown): error is BaseError {
	return error instanceof BaseError && error.code in ErrorCodes
}

export function isApiError(error: unknown): error is ApiError {
	if (!error) return false

	return error instanceof ApiError
}

export function asApiError(error: unknown) {
	if (!error) return

	if (isApiError(error)) return error
}

export function asBaseError(error: unknown): BaseError | undefined {
	if (!error) return

	if (isBaseError(error)) return error

	return
}

export function handleApiError(error: ApiError, silent: boolean) {
	const apiError = asApiError(error)

	if (apiError && !silent) {
		return {
			message: apiError.detail || apiError.message,
			code: apiError.status
		}
	}

	return { message: 'An unexpected API error occurred.' }
}

export function handleBaseError(error: unknown, silent: boolean) {
	const baseError = asBaseError(error)

	if (baseError && !silent) {
		return {
			message: baseError.message,
			code: baseError.code
		}
	}

	return { message: 'An unexpected base error occurred.' }
}

export function defaultErrorHandler(error: unknown, silent = true) {
	if (isBaseError(error)) {
		return handleBaseError(error, silent)
	} else if (isApiError(error)) {
		return handleApiError(error, silent)
	} else if (error instanceof Error) {
		// Handle generic errors if necessary
		if (!silent) {
			console.error(error.message)
		}
		throw error
	} else {
		// Handle unknown errors
		if (!silent) {
			console.error('Unknown error type', error)
		}
		throw new Error('An unexpected error occurred')
	}
}

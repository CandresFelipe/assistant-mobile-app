import { ApiError } from '@/error/ApiError'
import { BaseError } from '@/error/BaseError'
import { ErrorCodes } from '@/error/ErrorCodes'
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast'
import Colors from './theme'
import { NetworkError } from '@/error/NetworkError'

export function showErrorMessageToast(message: string) {
	toast.error(message, {
		height: 50,
		position: ToastPosition.TOP,
		styles: {
			view: {
				backgroundColor: Colors.error.secondary,
				borderRadius: 5,
				flexGrow: 1,
				minWidth: 300,
				flexShrink: 1
			},
			text: {
				color: 'white',
				fontWeight: 'bold',
				flexShrink: 1,
				flexWrap: 'wrap'
			}
		}
	})
}

export function isBaseError(error: unknown): error is BaseError {
	return error instanceof BaseError && error.code in ErrorCodes
}

export function isApiError(error: unknown): error is ApiError {
	if (!error) return false

	return error instanceof ApiError
}

export function asApiError(error: unknown) {
	if (!error) return

	if (isApiError(error)) return error as ApiError
}

export function asBaseError(error: unknown): BaseError | undefined {
	if (!error) return

	if (isBaseError(error)) return error

	return
}

export function isNetworkError(error: unknown): error is NetworkError {
	if (!error) return false

	return error instanceof NetworkError
}

export function handleNetworkError(error: NetworkError, silent: boolean) {
	const networkError = error as NetworkError

	if (networkError && !silent) {
		showErrorMessageToast(`${networkError.title}: ${networkError.description}`)
	}
	return `[${networkError.message}]: ${networkError.description} code: ${networkError.code}`
}

export function handleApiError(error: ApiError, silent: boolean) {
	const apiError = asApiError(error)

	if (apiError && !silent) {
		showErrorMessageToast(`${Object.values(apiError.body).at(0)}`)
	}

	return { message: 'An unexpected API error occurred.' }
}

export function handleBaseError(error: unknown, silent: boolean) {
	const baseError = asBaseError(error)

	if (baseError && !silent) {
		showErrorMessageToast(baseError.title)
	}

	return { message: 'An unexpected base error occurred.' }
}

export function defaultErrorHandler(error: unknown, silent = true) {
	console.warn('Error found', error)
	if (isBaseError(error)) {
		return handleBaseError(error, silent)
	} else if (isApiError(error)) {
		return handleApiError(error, silent)
	} else if (isNetworkError(error)) {
		return handleNetworkError(error, silent)
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

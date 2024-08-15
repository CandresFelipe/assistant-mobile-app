import { Method } from 'axios'

type ApiRequestOptions = {
	readonly method: Method
	readonly url: string
	readonly path?: Record<string, any>
	readonly cookies?: Record<string, any>
	readonly headers?: Record<string, any>
	readonly query?: Record<string, any>
	readonly formData?: Record<string, any>
	readonly body?: any
	readonly mediaType?: string
	readonly responseHeader?: string
	readonly errors?: Record<number, string>
}

export type ApiResult = {
	readonly url: string
	readonly ok: boolean
	readonly status: number
	readonly statusText: string
	readonly body: unknown
}

export class ApiError extends Error {
	public readonly url: string
	public readonly status: number
	public readonly statusText: string
	public readonly body: unknown
	public readonly request: ApiRequestOptions
	public readonly detail?: string

	constructor(request: ApiRequestOptions, response: ApiResult, message: string, detail?: string) {
		super(message)

		this.name = 'ApiError'
		this.url = response.url
		this.status = response.status
		this.statusText = response.statusText
		this.body = response.body
		this.request = request
		this.detail = detail
	}
}

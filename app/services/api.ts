import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, Method } from 'axios'

import { ApiError } from '@/error/ApiError'
import { getAccessToken } from './storage'

type ApiResponseType<T> = Promise<AxiosResponse<T, unknown>> | undefined

interface ApiErrorResponse {
	name: string
	url?: string
	status?: number
	statusText?: string
	body: object
	details?: string
}

export class ApiService {
	private axiosInstance: AxiosInstance | null = null
	private static instance: ApiService

	constructor(config?: CreateAxiosDefaults<any>) {
		if (this.axiosInstance !== null) {
			return
		}

		const _config = {
			...config,
			baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
			timeout: 5000
		}
		this.axiosInstance = axios.create(_config)

		this.addJwtRequestInterceptor()
		this.addJwtResponseInterceptor()
	}

	public static getInstance(config?: CreateAxiosDefaults<any>): ApiService {
		if (!this.instance) {
			this.instance = new ApiService(config)
		}
		return this.instance
	}

	public get<T = unknown>(url: string, config?: AxiosRequestConfig): ApiResponseType<T> {
		return this.axiosInstance?.get<T>(url, config)
	}

	public post<T = unknown>(url: string, data: unknown, config?: AxiosRequestConfig): ApiResponseType<T> {
		return this.axiosInstance?.post<T>(url, data, config)
	}

	public patch<T = unknown>(url: string, data: T, config?: AxiosRequestConfig): ApiResponseType<T> {
		return this.axiosInstance?.patch<T>(url, data, config)
	}

	public delete<T = unknown>(url: string, config?: AxiosRequestConfig): ApiResponseType<T> {
		return this.axiosInstance?.delete<T>(url, config)
	}

	private async getJwtToken() {
		return await getAccessToken()
	}

	private addJwtRequestInterceptor() {
		this.axiosInstance?.interceptors.request.use(
			async (config) => {
				const bearerToken = await this.getJwtToken()

				if (!bearerToken) {
					return config
				}
				config.headers.Authorization = bearerToken

				return config
			},
			(error) => Promise.reject(error)
		)
	}

	private addJwtResponseInterceptor() {
		this.axiosInstance?.interceptors.response.use(
			(response) => {
				return response
			},
			(error: AxiosError) => {
				const { config, response } = error

				if (response) {
					const apiErrorData: ApiErrorResponse = {
						name: error.name,
						url: config?.url,
						status: error.status,
						statusText: response.statusText,
						body: response.data || {},
						details: response.data as string
					}
					const detailMessage = JSON.stringify(apiErrorData.body) || apiErrorData.details || 'An error occurred'
					const apiError = new ApiError(
						{
							method: config?.method as Method,
							url: config?.url || '',
							headers: config?.headers,
							body: config?.data as object
						},
						{
							url: response?.config.url || '',
							ok: response?.status ? response?.status >= 200 && response?.status < 400 : false,
							status: response?.status || 500,
							statusText: response?.statusText || '',
							body: response?.data as object
						},
						detailMessage
					)

					return Promise.reject(apiError)
				}

				return Promise.reject(error)
			}
		)
	}
}

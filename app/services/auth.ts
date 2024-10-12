import { AxiosResponse } from 'axios'
import { ApiService } from './api'
import { saveSessionTokens, getSessionTokens } from './storage'
import { ILoginResponse, IUserCreation, IUserLogin } from '@/types/user'

export class AuthorizationService {
	private static BASE_PATH = `/auth/jwt/`

	private static readonly apiClient: ApiService = ApiService.getInstance()

	static async registerUser(params: IUserCreation) {
		const response = await this.apiClient.post('/auth/users/', params)
		return response?.data
	}

	static async loginUser(params: IUserLogin): Promise<void | undefined> {
		const response = await this.apiClient.post<ILoginResponse>(`${this.BASE_PATH}create`, params)
		if (response?.data) {
			await saveSessionTokens(response.data)
		}
	}

	static async logoutUser(): Promise<AxiosResponse<undefined, unknown> | undefined> {
		const response = await this.apiClient.post<undefined>('/auth/logout/', {})
		return response?.data
	}

	static async verifyUser(token: string): Promise<boolean> {
		const response = await this.apiClient.post<string>(`${this.BASE_PATH}verify/`, { token })
		return response?.status === 200
	}

	static async refreshUserToken(refresh: string): Promise<{ refresh: string; access: string } | undefined> {
		const response = await this.apiClient.post<{ refresh: string; access: string }>(`${this.BASE_PATH}refresh/`, {
			refresh
		})
		return response?.data
	}

	static async checkUserVerification() {
		const token = await getSessionTokens()

		if (!token) return false

		const isValidAccessToken = await this.verifyUser(token.access)

		if (!isValidAccessToken) return false

		const newTokens = await this.refreshUserToken(token.refresh)

		if (!newTokens) return false

		saveSessionTokens(newTokens)

		return true
	}
}

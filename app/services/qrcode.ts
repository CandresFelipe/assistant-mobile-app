import { ApiService } from './api'

export class QRCodeService {
	private static readonly apiClient: ApiService = ApiService.getInstance()

	static async verifyQRcode(qr_data: string): Promise<number | undefined> {
		const response = await this.apiClient.post('/verify-qr/', { qr_data })
		return response?.status
	}
}

import { ApiService } from './api'
export interface QRCodeDataRequest {
	qr_data: string
}
export class QRCodeService {
	private static readonly apiClient: ApiService = ApiService.getInstance()

	static async verifyQRcode({ qr_data }: QRCodeDataRequest): Promise<number | undefined> {
		const response = await this.apiClient.post('/verify-qr/', { qr_data })
		return response?.status
	}
}

import { BaseError } from '@/error/BaseError'
import { ErrorCodes } from '@/error/ErrorCodes'
import { QRCodeDataRequest, QRCodeService } from '@/services/qrcode'
import { useMutation } from '@tanstack/react-query'

enum VerifyAssistanceKey {
	CheckQRcode = 'check-qrcode'
}

export function useVerifyAssistance() {
	return useMutation({
		mutationKey: [VerifyAssistanceKey.CheckQRcode],
		mutationFn: async ({ qr_data }: QRCodeDataRequest) => {
			if (!qr_data) {
				throw new BaseError(ErrorCodes.NotFound, 'QR id not defined, check again.', '', true)
			}

			return await QRCodeService.verifyQRcode({ qr_data })
		}
	})
}

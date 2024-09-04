import { BaseError } from '@/error/BaseError'
import { ErrorCodes } from '@/error/ErrorCodes'
import { QRCodeService } from '@/services/qrcode'
import { useMutation } from '@tanstack/react-query'

enum VerifyAssistanceKey {
	CheckQRcode = 'check-qrcode'
}

export function useVerifyAssistance() {
	return useMutation({
		mutationKey: [VerifyAssistanceKey.CheckQRcode],
		mutationFn: async (data: string) => {
			if (!data) {
				throw new BaseError(ErrorCodes.NotFound, 'QR id not defined, check again.', '', true)
			}

			return await QRCodeService.verifyQRcode(data)
		}
	})
}

import { View, Text, Linking, Platform, StyleSheet } from 'react-native'
import {
	CameraView,
	useCameraPermissions,
	PermissionResponse,
	PermissionStatus,
	BarcodeScanningResult
} from 'expo-camera'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { CustomButton, LoadingModal } from '@/components'
import { IconFrame } from '@/icons'
import { useIsAppActive } from '@/hooks/useIsAppActive'
import { useFocusEffect, useRouter } from 'expo-router'
import { useVerifyAssistance } from '@/queries/verifyAssistance'
import { defaultErrorHandler } from '@/utils/error-handling'
import { Toasts } from '@backpackapp-io/react-native-toast'

interface TemporaryQRCodeResponse {
	participant_id: string
	event_id: string
	qr_identifier: string
}

export default function QRScanScreen() {
	const [cameraPermission, requestCameraPermission] = useCameraPermissions()
	const [responseCameraPermission, setResonseCameraPermission] = useState<PermissionResponse>()
	const isActiveApp = useIsAppActive()
	const isScreenFocused = useRef(false)
	const camera = useRef<CameraView>(null)
	const verifyAssitanceMutation = useVerifyAssistance()
	const router = useRouter()
	const [isScanning, setIsScanning] = useState(true)

	useEffect(() => {
		// Only request permission if it hasn't been requested yet
		if (!cameraPermission || cameraPermission.status === PermissionStatus.UNDETERMINED) {
			const requestingCameraPermission = async () => {
				const res = await requestCameraPermission()
				setResonseCameraPermission(res)
			}

			requestingCameraPermission()
		}
	}, [cameraPermission, requestCameraPermission])

	useFocusEffect(
		useCallback(() => {
			console.log('camera is on')
			isScreenFocused.current = true

			return () => {
				console.log('camera is off')
				isScreenFocused.current = false
			}
		}, [])
	)

	useEffect(() => {
		const retryPermissionRequest = async () => {
			if (cameraPermission?.canAskAgain && Platform.OS === 'android') {
				await requestCameraPermission()
			}
		}

		retryPermissionRequest()
	}, [cameraPermission?.canAskAgain])

	const onCheckQrCode = (scanningResult: BarcodeScanningResult) => {
		if (scanningResult.data && isActiveApp && isScanning && isScreenFocused) {
			setIsScanning(false)
			const parsedResult = JSON.parse(scanningResult.data) as TemporaryQRCodeResponse
			verifyAssitanceMutation.mutate(
				{
					qr_data: Object.values(parsedResult).join(';')
				},
				{
					onSuccess: () => {
						setIsScanning(false)
						router.navigate('/success-feedback/')
					},
					onError: (error) => {
						console.log(JSON.stringify(error, undefined, '\t'))
						defaultErrorHandler(error, false)
					}
				}
			)
		}
	}

	if (!responseCameraPermission?.canAskAgain && responseCameraPermission?.status === PermissionStatus.DENIED) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<CustomButton title={'Enable camera permission'} onPress={() => Linking.openSettings()} />
			</View>
		)
	}
	return (
		<Fragment>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ flex: 1, position: 'relative', marginHorizontal: 48, justifyContent: 'space-evenly' }}>
					<View style={styles.cameraContainer}>
						<CameraView
							ref={camera}
							style={{ height: 400, width: 300 }}
							autofocus="on"
							barcodeScannerSettings={{
								barcodeTypes: ['qr']
							}}
							active={isActiveApp && isScreenFocused.current}
							facing="back"
							onBarcodeScanned={onCheckQrCode}
						/>
						<View style={{ position: 'absolute', left: 0 }}>
							<IconFrame />
						</View>
						<View style={{ position: 'absolute', right: 0, transform: 'rotate(90deg)' }}>
							<IconFrame />
						</View>
						<View style={{ position: 'absolute', bottom: 0, transform: 'rotate(-90deg)' }}>
							<IconFrame />
						</View>
						<View style={{ position: 'absolute', bottom: 0, right: 0, transform: 'rotate(180deg)' }}>
							<IconFrame />
						</View>
					</View>
					<View>
						<Text style={{ fontSize: 24, justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>
							{' '}
							Scan QRcode for checking assitance !
						</Text>
					</View>
				</View>
			</View>
			<LoadingModal visible={verifyAssitanceMutation.isPending} />
			<Toasts onToastHide={() => setIsScanning(true)} />
		</Fragment>
	)
}

const styles = StyleSheet.create({
	cameraContainer: {
		padding: 10
	}
})

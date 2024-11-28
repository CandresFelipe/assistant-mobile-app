import { useUserSession } from '@/contexts/authenticationContext'
import { useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
	const { sessionOpen, isLoading } = useUserSession()
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		if (isLoading) return

		const segmentIsInGroup = segments[0] === '(protected)'

		if (sessionOpen && !segmentIsInGroup) {
			router.replace('/qrcode-reader')
		} else if (!sessionOpen && segmentIsInGroup) {
			router.replace('/welcome')
		} else if (!sessionOpen && !segmentIsInGroup) {
			router.replace('/welcome')
		}
	}, [isLoading, sessionOpen, segments])

	if (isLoading) {
		return (
			<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
				<ActivityIndicator size={'large'} />
			</View>
		)
	}

	return null
}

import { useUserSession } from '@/contexts/authenticationContext'
import { Redirect, Stack } from 'expo-router'
import { View, Text } from 'react-native'

export default function RootLayout() {
	const { sessionOpen, isLoading } = useUserSession()

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>is loading</Text>
			</View>
		)
	}

	if (!sessionOpen) {
		return <Redirect href="/sign-in" />
	}

	return <Stack />
}

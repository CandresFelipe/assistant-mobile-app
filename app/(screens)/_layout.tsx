import { NavigationHeader } from '@/components'
import { AuthenticationProvider, useUserSession } from '@/contexts/authenticationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'

import { View, Text } from 'react-native'

const RootLayout = () => {
	const { isLoading, sessionOpen } = useUserSession()
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const inAuthGroup = segments[0] === '(protected)'

		if (!sessionOpen && inAuthGroup && !isLoading) {
			router.replace('/')
		} else if (sessionOpen) {
			router.replace('/(protected)')
		}
	}, [sessionOpen])

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Is loading</Text>
			</View>
		)
	}

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="register"
				options={{
					header: (props) => <NavigationHeader onNavigate={props.navigation.goBack} />
				}}
			/>
			<Stack.Screen
				name="login"
				options={{
					header: (props) => <NavigationHeader onNavigate={props.navigation.goBack} />
				}}
			/>
			<Stack.Screen name="(protected)" options={{ headerShown: false }} />
		</Stack>
	)
}

export default function Layout() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticationProvider>
				<RootLayout />
			</AuthenticationProvider>
		</QueryClientProvider>
	)
}

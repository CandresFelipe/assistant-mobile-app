import { NavigationHeader } from '@/components'
import { AuthenticationProvider, useUserSession } from '@/contexts/authenticationContext'
import { Toasts } from '@backpackapp-io/react-native-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
				<GestureHandlerRootView style={{ flex: 1 }}>
					<RootLayout />
					<Toasts />
				</GestureHandlerRootView>
			</AuthenticationProvider>
		</QueryClientProvider>
	)
}

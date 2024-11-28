import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthenticationProvider } from './contexts/authenticationContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toasts } from '@backpackapp-io/react-native-toast'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticationProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Slot />
					<Toasts />
					<StatusBar style="auto" />
				</GestureHandlerRootView>
			</AuthenticationProvider>
		</QueryClientProvider>
	)
}

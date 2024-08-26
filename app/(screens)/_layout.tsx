import { AuthenticationProvider } from '@/contexts/authenticationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function AuthenticationLayout() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticationProvider>
				<StatusBar translucent style="auto" />
				<Slot />
			</AuthenticationProvider>
		</QueryClientProvider>
	)
}

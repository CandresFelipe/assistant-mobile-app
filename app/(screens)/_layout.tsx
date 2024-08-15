import { AuthenticationProvider } from '@/contexts/authenticationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot } from 'expo-router'

export default function AuthenticationLayout() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticationProvider>
				<Slot />
			</AuthenticationProvider>
		</QueryClientProvider>
	)
}

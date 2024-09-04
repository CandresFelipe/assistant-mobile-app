import { NavigationHeader } from '@/components'
import { useUserSession } from '@/contexts/authenticationContext'
import Colors from '@/utils/theme'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function AppLayout() {
	const { sessionOpen, isLoading } = useUserSession()
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const allInGroup = segments[0] === '(protected)'
		if (!sessionOpen && allInGroup) {
			router.replace('/welcome')
		} else if (sessionOpen && !allInGroup) {
			router.replace('/qrcode-reader')
		}
	}, [sessionOpen])

	if (isLoading) {
		return (
			<View style={styles.loadingViewContainer}>
				<ActivityIndicator size={'large'} color={Colors.light.white} />
			</View>
		)
	}

	return (
		<Stack
			screenOptions={{
				statusBarStyle: 'light',
				statusBarTranslucent: true,
				statusBarAnimation: 'fade',
				animation: 'fade_from_bottom'
			}}
		>
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
			<Stack.Screen options={{ headerShown: false }} name="welcome" />
			<Stack.Screen
				name="(protected)"
				options={{ headerShown: false, statusBarStyle: 'dark', statusBarAnimation: 'fade', animation: 'default' }}
			/>
		</Stack>
	)
}

const styles = StyleSheet.create({
	loadingViewContainer: {
		flex: 1,
		backgroundColor: Colors.dark.primary,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

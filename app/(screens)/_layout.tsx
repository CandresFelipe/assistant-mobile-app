import { NavigationHeader } from '@/components'
import { useUserSession } from '@/contexts/authenticationContext'
import Colors from '@/utils/theme'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function AppLayout() {
	const { isLoading } = useUserSession()

	if (isLoading) {
		return (
			<View style={styles.loadingViewContainer}>
				<ActivityIndicator size={'large'} color={Colors.light.white} />
			</View>
		)
	}

	return (
		<>
			<StatusBar style="light" />
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
				<Stack.Screen options={{ headerShown: false }} name="welcome" />
			</Stack>
		</>
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

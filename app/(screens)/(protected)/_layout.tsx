import { useUserSession } from '@/contexts/authenticationContext'
import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Feather from '@expo/vector-icons/Feather'
import { View, Text } from 'react-native'

export default function Layout() {
	const { isLoading } = useUserSession()

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Is loading</Text>
			</View>
		)
	}

	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: 'Scan QR',
					title: 'Scan QR',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="qrcode-scan" size={24} color={color} />
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarLabel: 'Settings',
					title: 'Settings',
					tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />
				}}
			/>
		</Tabs>
	)
}

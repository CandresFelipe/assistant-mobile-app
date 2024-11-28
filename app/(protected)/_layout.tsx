import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Feather from '@expo/vector-icons/Feather'
import { StatusBar } from 'expo-status-bar'

export default function ProtectedLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="qrcode-reader"
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
			<Tabs.Screen name="success-feedback" options={{ href: null }} />
		</Tabs>
	)
}

import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Feather from '@expo/vector-icons/Feather'
export default function Layout() {
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
			<Tabs.Screen name="success-feedback" options={{ href: null }} />
		</Tabs>
	)
}

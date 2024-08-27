import { CustomButton } from '@/components'
import { useUserSession } from '@/contexts/authenticationContext'
import { View } from 'react-native'

export default function SettingsScreen() {
	const { logout } = useUserSession()

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<CustomButton title={'Logut'} onPress={logout} />
		</View>
	)
}

import { CustomButton } from '@/components'
import Colors from '@/utils/theme'
import { router } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function EntryScreen() {
	const registerNav = () => {
		router.navigate('/register')
	}

	const logInNav = () => {
		router.navigate('/login')
	}

	return (
		<View style={styles.container}>
			<View style={{ position: 'absolute', bottom: 24, gap: 24, right: 0, left: 0, alignItems: 'center' }}>
				<CustomButton title={'Register!'} onPress={registerNav} />
				<CustomButton title={'Log In'} onPress={logInNav} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		backgroundColor: Colors.dark.primary
	}
})

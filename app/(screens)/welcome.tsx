import { CustomButton } from '@/components'
import { router } from 'expo-router'
import Colors from '@/utils/theme'
import { View, StyleSheet, Text } from 'react-native'
import Animated, {
	useAnimatedStyle,
	withTiming,
	Easing,
	interpolate,
	useSharedValue,
	Extrapolation
} from 'react-native-reanimated'
import { useEffect } from 'react'

export default function Welcome() {
	const animatedOpacity = useSharedValue(1)
	const registerNav = () => {
		router.navigate('/register')
	}

	const logInNav = () => {
		router.navigate('/login')
	}

	const logoAnimation = useAnimatedStyle(() => {
		const opacity = interpolate(animatedOpacity.value, [0, 1], [1, 0], Extrapolation.CLAMP)

		return {
			opacity
		}
	})

	useEffect(() => {
		animatedOpacity.value = withTiming(0, {
			duration: 2000, // 1 second animation
			easing: Easing.ease
		})
	}, [])

	return (
		<View style={styles.container}>
			<Animated.View style={[logoAnimation, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
				<Text style={{ fontSize: 36, color: Colors.light.white, fontWeight: '900' }}>BLOCK-CERTIFIC@</Text>
				<Text style={{ fontSize: 18, color: Colors.dark.textSecondary, textAlign: 'center', opacity: 0.5 }}>
					App para la verificacion de asistencia de participantes
				</Text>
			</Animated.View>
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

import Colors from '@/utils/theme'
import { forwardRef, Fragment, useRef } from 'react'
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native'
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface InputProps extends TextInputProps {
	label: string
	onClear?: () => void
	errorMessage?: string
	hasError?: boolean
	hasPlaceholder?: boolean
	disable?: boolean
}

const INPUT_HEIGHT = 52
const INPUT_PLACEHOLDER_DEFAULT_FONT_SIZE = 16
const INPUT_PLACEHOLDER_ACTIVE_FONT_SIZE = 12
const INPUT_PLACEHOLDER_DEFAULT_TOP = INPUT_HEIGHT / 2 - 10
const INPUT_PLACEHOLDER_ACTIVE_TOP = 5

export const Input = forwardRef<TextInput, InputProps>(({ label, errorMessage, hasError, ...props }, ref) => {
	const textRef = useRef<string>('')
	const placeholderPositionTop = useSharedValue(INPUT_PLACEHOLDER_DEFAULT_TOP)
	const placeholderFontSize = useSharedValue(INPUT_PLACEHOLDER_DEFAULT_FONT_SIZE)
	const hasPlaceholder = props.placeholder && props.placeholder.length > 0

	const handlingPlaceholderOnFocus = () => {
		placeholderFontSize.value = withTiming(INPUT_PLACEHOLDER_ACTIVE_FONT_SIZE, {
			duration: 150,
			easing: Easing.inOut(Easing.quad)
		})

		placeholderPositionTop.value = withTiming(INPUT_PLACEHOLDER_ACTIVE_TOP, {
			duration: 150,
			easing: Easing.inOut(Easing.quad),
			reduceMotion: ReduceMotion.System
		})
	}
	const handlingPlaceholderOnBlur = () => {
		if (textRef.current.length > 0) return

		placeholderFontSize.value = withTiming(INPUT_PLACEHOLDER_DEFAULT_FONT_SIZE, {
			duration: 150,
			easing: Easing.inOut(Easing.quad)
		})

		placeholderPositionTop.value = withTiming(INPUT_PLACEHOLDER_DEFAULT_TOP, {
			duration: 150,
			easing: Easing.inOut(Easing.quad)
		})
	}

	const onChangeText = (text: string) => {
		props.onChangeText?.(text)
		textRef.current = text
	}

	const placeholderStyle = useAnimatedStyle(() => ({
		top: placeholderPositionTop.value,
		fontSize: placeholderFontSize.value
	}))

	return (
		<View style={styles.container}>
			<Fragment>
				<View style={[styles.inputContainer]}>
					<TextInput
						{...props}
						ref={ref}
						onFocus={handlingPlaceholderOnFocus}
						onBlur={handlingPlaceholderOnBlur}
						underlineColorAndroid="transparent"
						style={[styles.input, { color: hasError ? Colors.error.primary : Colors.light.textSecondary }]}
						onChangeText={onChangeText}
					>
						{label}
					</TextInput>
					{!!errorMessage && <Animated.Text style={styles.errorMessage}>{errorMessage}</Animated.Text>}
					{hasPlaceholder && (
						<Animated.Text style={[placeholderStyle, styles.placeholderContainer]}>{props.placeholder}</Animated.Text>
					)}
				</View>
			</Fragment>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		position: 'relative'
	},
	inputContainer: {
		borderRadius: 5,
		height: INPUT_HEIGHT
	},
	input: {
		paddingHorizontal: 3,
		paddingVertical: 2,
		backgroundColor: Colors.light.white,
		borderRadius: 5,
		flexWrap: 'wrap',
		borderWidth: 3,
		borderColor: Colors.light.textSecondary,
		height: INPUT_HEIGHT
	},
	errorMessage: {
		color: Colors.error.primary
	},
	placeholderContainer: {
		position: 'absolute',
		left: 12
	}
})

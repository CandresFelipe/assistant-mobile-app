import { ButtonProps as NativeButtonProps } from '@rneui/base'
import { Button } from '@rneui/themed'
import { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

export const CustomButton: FunctionComponent<NativeButtonProps> = ({ ...props }) => {
	return (
		<View style={styles.buttonContainer}>
			<Button {...props} buttonStyle={styles.buttonStyles}>
				{props.children}
			</Button>
		</View>
	)
}
const styles = StyleSheet.create({
	buttonContainer: {
		position: 'relative'
	},
	buttonStyles: {
		borderWidth: 0,
		borderColor: 'transparent',
		borderRadius: 18,
		width: '100%',
		flexWrap: 'wrap'
	}
})

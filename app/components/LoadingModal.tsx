import Colors from '@/utils/theme'
import { FunctionComponent } from 'react'
import { ActivityIndicator, Dimensions, Modal, ModalProps, StyleSheet, View } from 'react-native'

interface LoadingModalProps extends ModalProps {}

export const LoadingModal: FunctionComponent<LoadingModalProps> = ({ ...rest }) => {
	return (
		<Modal {...rest} animationType="fade" transparent statusBarTranslucent style={styles.modalContainer}>
			<ActivityIndicator size={'large'} color={Colors.light.primary} style={styles.indicator} />
			<View style={styles.viewContainer}></View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		height: Dimensions.get('screen').height,
		width: Dimensions.get('screen').width
	},
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		opacity: 0.5
	},
	indicator: {
		zIndex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}
})

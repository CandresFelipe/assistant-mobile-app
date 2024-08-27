import Colors from '@/utils/theme'
import { Header } from '@rneui/themed'
import { FunctionComponent, PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'

interface NavigationHeaderProps extends PropsWithChildren {
	onNavigate: () => void
	title?: string
	hasBack?: boolean
	backgroundColor?: string
}

export const NavigationHeader: FunctionComponent<NavigationHeaderProps> = ({ onNavigate, backgroundColor }) => {
	return (
		<Header
			containerStyle={[styles.container, { backgroundColor: backgroundColor ? backgroundColor : Colors.dark.primary }]}
			leftComponent={{
				icon: 'chevron-left',
				color: Colors.light.primary,
				onPress: onNavigate,
				size: 32
			}}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'center',
		paddingVertical: 10,
		position: 'absolute',
		shadowColor: 'transparent',
		elevation: 0,
		borderWidth: 0,
		borderBottomColor: 'transparent'
	}
})

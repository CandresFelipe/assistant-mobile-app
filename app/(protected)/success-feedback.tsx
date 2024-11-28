import { View, Text } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

export default function SuccessFeedback() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
			<Entypo name="check" size={58} color={'green'} />
			<Text style={{ fontSize: 32, fontWeight: 'bold' }}> User checked successfully.</Text>
		</View>
	)
}

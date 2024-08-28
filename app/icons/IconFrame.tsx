import Colors from '@/utils/theme'
import Svg, { Path } from 'react-native-svg'

export const IconFrame = () => {
	return (
		<Svg width={29} height={28}>
			<Path
				d="M2 26V7a5 5 0 0 1 5 -5h20"
				stroke={Colors.dark.primary}
				strokeWidth={3}
				strokeLinecap="round"
				fill="transparent"
			/>
		</Svg>
	)
}

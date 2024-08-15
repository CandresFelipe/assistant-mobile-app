import 'ts-node/register' // Add this to import TypeScript files
import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
	name: 'assistant-mobile-app',
	slug: 'assistant-mobile-app',
	orientation: 'portrait',
	plugins: ['expo-router'],
	scheme: 'assistant-mobile-app'
}

export default config

import 'ts-node/register' // Add this to import TypeScript files
import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
	name: 'assistant-mobile-app',
	slug: 'assistant-mobile-app',
	orientation: 'portrait',
	plugins: ['expo-router'],
	scheme: 'com.assistantmobileapp',
	extra: {
		eas: {
			projectId: '36208d9e-67a5-4fa9-835c-5fc2e75a34ec'
		}
	},
	ios: {
		bundleIdentifier: 'com.assistantmobileapp' // REQUIRED for iOS builds
	},
	android: {
		package: 'com.assistantmobileapp' // REQUIRED for Android builds
	}
}

export default config

import * as SecureStorage from 'expo-secure-store'

enum StorageKeys {
	accessToken = 'accessToken',
	refreshToken = 'refreshToken'
}

export async function saveAccessToken(accessToken: string) {
	return await SecureStorage.setItemAsync(StorageKeys.accessToken, accessToken)
}

export async function getAccessToken() {
	return await SecureStorage.getItemAsync(StorageKeys.accessToken)
}

export async function removeAccessToken() {
	return await SecureStorage.deleteItemAsync(StorageKeys.accessToken)
}

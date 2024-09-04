import * as SecureStorage from 'expo-secure-store'

enum StorageKeys {
	SessionTokens = 'session-tokens'
}

export async function saveSessionTokens(tokens: object) {
	return await SecureStorage.setItemAsync(StorageKeys.SessionTokens, JSON.stringify(tokens))
}

export async function getSessionTokens(): Promise<{ access: string; refresh: string } | null> {
	const data = await SecureStorage.getItemAsync(StorageKeys.SessionTokens)
	return data ? JSON.parse(data) : null
}

export async function removeSessionTokens() {
	return await SecureStorage.deleteItemAsync(StorageKeys.SessionTokens)
}

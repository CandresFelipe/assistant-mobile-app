import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export function useIsAppActive(): boolean {
	const [isActiveApp, setIsActiveApp] = useState(true)

	useEffect(() => {
		const onChange = (state: AppStateStatus): void => {
			setIsActiveApp(state === 'active')
		}

		const listener = AppState.addEventListener('change', onChange)

		return () => listener.remove()
	})

	return isActiveApp
}

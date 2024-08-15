import { useCreateUser, useLogin, useLogout } from '@/queries/auth'
import { IUserCreation, IUserLogin } from '@/types/user'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type AuthContextType = {
	login: (user: IUserLogin) => void
	logout: () => void
	signIn: (data: IUserCreation) => void
	isLoading: boolean
	sessionOpen: boolean
}

const AuthContext = createContext<AuthContextType>({
	login: () => null,
	logout: () => null,
	signIn: () => null,
	isLoading: false,
	sessionOpen: false
})

export function useUserSession() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useUserSession should be wrapped in a AuthenticationProvider')
	}
	return context
}

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
	const [sessionOpen, setSessionOpen] = useState(false)
	const signInMutation = useCreateUser()
	const loginMutation = useLogin()
	const logoutMutation = useLogout()

	const login = (data: IUserLogin) => {
		loginMutation.mutate(data)
	}
	const logout = () => {
		logoutMutation.mutate(undefined, {
			onSuccess: () => setSessionOpen(true)
		})
	}

	const signIn = (data: IUserCreation) => {
		signInMutation.mutate(data, {
			onSuccess: () => setSessionOpen(true)
		})
	}

	const isLoading = signInMutation.isPending || loginMutation.isPending || logoutMutation.isPending

	const values = { login, logout, signIn, isLoading, sessionOpen }

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

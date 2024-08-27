import { useCreateUser, useLogin, useLogout } from '@/queries/auth'
import { IUserCreation, IUserLogin } from '@/types/user'
import { UseMutationResult } from '@tanstack/react-query'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type AuthContextType = {
	login: UseMutationResult<void, Error, IUserLogin, unknown> | undefined
	logout: () => void
	register: (data: IUserCreation) => void
	isLoading: boolean
	sessionOpen: boolean
	setSessionOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType>({
	login: undefined,
	logout: () => null,
	register: () => null,
	isLoading: false,
	sessionOpen: false,
	setSessionOpen: () => false
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

	const logout = () => {
		logoutMutation.mutate(undefined, {
			onSuccess: () => setSessionOpen(false)
		})
	}

	const register = (data: IUserCreation) => {
		signInMutation.mutate(data, {
			onSuccess: () => setSessionOpen(true)
		})
	}

	const isLoading = signInMutation.isPending || loginMutation.isPending || logoutMutation.isPending

	const values = { login: loginMutation, logout, register, isLoading, sessionOpen, setSessionOpen }

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

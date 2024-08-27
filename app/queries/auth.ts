import { AuthorizationService } from '@/services/auth'
import { IUserCreation, IUserLogin } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

enum AuthKeys {
	CreateUser = 'create-user',
	LoginUser = 'login-user',
	logoutUser = 'logout-user'
}

export function useCreateUser() {
	return useMutation({
		mutationKey: [AuthKeys.CreateUser],
		mutationFn: async (data: IUserCreation) => await AuthorizationService.registerUser(data)
	})
}

export function useLogin() {
	return useMutation({
		mutationKey: [AuthKeys.LoginUser],
		mutationFn: async (data: IUserLogin) => {
			await AuthorizationService.loginUser(data)
		}
	})
}

export function useLogout() {
	return useMutation({
		mutationKey: [AuthKeys.logoutUser],
		mutationFn: async () => await AuthorizationService.logoutUser()
	})
}

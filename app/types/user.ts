export interface User {
	email: string
	password: string
	username?: string
}

export interface IUserCreation {
	first_name: string
	last_name: string
	username: string
	email: string
	password: string
	re_password: string
}

export interface IUserLogin {
	email: string
	password: string
}

export interface ILoginResponse {
	access: string
	refresh: string
}

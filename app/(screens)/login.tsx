import { FormField, Form, CustomButton, IFormHandler, LoadingModal } from '@/components'
import { IUserLogin } from '@/types/user'
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { RegisterOptions } from 'react-hook-form'
import Colors from '@/utils/theme'
import { useRef } from 'react'
import { useUserSession } from '@/contexts/authenticationContext'

const logInFields: FormField<IUserLogin>[] = [
	{
		name: 'email',
		type: 'email-address',
		label: 'Email'
	},
	{
		name: 'password',
		type: 'default',
		label: 'Password'
	}
]

const logInValidations: Record<keyof IUserLogin, RegisterOptions<IUserLogin>> = {
	email: {
		required: 'Email is required',
		pattern: {
			value: /^\S+@\S+\.\S+$/,
			message: 'Invalid email address'
		}
	},
	password: {
		required: 'Password is required'
	}
}
const defaultValues: IUserLogin = {
	email: '',
	password: ''
}

export default function LogIn() {
	const formRef = useRef<IFormHandler>(null)
	const { login } = useUserSession()

	const onLogIn = (data: IUserLogin) => {
		login?.mutate(data)
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1, marginBottom: 10, backgroundColor: Colors.dark.primary }}>
			<TouchableWithoutFeedback>
				<ScrollView
					contentContainerStyle={{
						justifyContent: 'center',
						flex: 1,
						flexDirection: 'column',
						gap: 24,
						paddingHorizontal: 48,
						backgroundColor: Colors.dark.primary
					}}
				>
					<Form
						ref={formRef}
						fields={logInFields}
						title="LogIn"
						onSubmit={onLogIn}
						validationRules={logInValidations}
						defaultValues={defaultValues}
					/>
					<CustomButton title={'Submit'} style={{ paddingHorizontal: 48 }} onPress={() => formRef.current?.submit()} />
				</ScrollView>
			</TouchableWithoutFeedback>
			<LoadingModal visible={login?.isPending} />
		</KeyboardAvoidingView>
	)
}

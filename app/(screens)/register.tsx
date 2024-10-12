import { CustomButton, Form, FormField } from '@/components'
import { IUserCreation } from '@/types/user'
import Colors from '@/utils/theme'
import { RegisterOptions } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'

const signUpFields: FormField<IUserCreation>[] = [
	{
		name: 'first_name',
		type: 'default',
		label: 'First name'
	},
	{
		name: 'last_name',
		type: 'default',
		label: 'Last name'
	},
	{
		name: 'email',
		type: 'email-address',
		label: 'Email'
	},
	{
		name: 'username',
		type: 'default',
		label: 'User name'
	},
	{
		name: 'password',
		type: 'default',
		label: 'Password'
	},
	{
		name: 're_password',
		type: 'default',
		label: 'Confirm Password'
	}
]

const fieldValidations: Record<keyof IUserCreation, RegisterOptions<IUserCreation>> = {
	email: {
		required: 'Email is required',
		pattern: {
			value: /^\S+@\S+\.\S+$/,
			message: 'Invalid email address'
		}
	},
	password: {
		required: 'Password is required',
		minLength: {
			value: 9,
			message: 'Password must be at least 9 characters long'
		},
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
		}
	},
	first_name: {},
	last_name: {},
	re_password: {
		required: 'Password is required',
		setValueAs(value) {
			return value === fieldValidations.password.value
		}
	},
	username: {}
}

const defaultValues: IUserCreation = {
	first_name: '',
	last_name: '',
	password: '',
	re_password: '',
	username: '',
	email: ''
}

export default function SignInPage() {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1, backgroundColor: Colors.dark.primary }}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
						fields={signUpFields}
						title="Register"
						validationRules={fieldValidations}
						defaultValues={defaultValues}
					/>
					<CustomButton title={'Submit'} style={{ paddingHorizontal: 48 }} />
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

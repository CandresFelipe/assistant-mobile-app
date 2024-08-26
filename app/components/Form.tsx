import { forwardRef, useImperativeHandle } from 'react'
import { Control, Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInputProps } from 'react-native'
import { Input } from './Input'
import Colors from '@/utils/theme'

export interface FormField<T> {
	name: keyof T
	label: string
	type: TextInputProps['keyboardType']
	placeholder?: string
}

export interface AuthFormProps<T> {
	title: string
	fields: FormField<T>[]
	defaultValues: Partial<T>
	onSubmit?: (data: T) => Promise<void> | void
	validationRules?: Record<keyof T, Record<string, any>>
	children?: React.ReactNode
}

export interface IFormHandler {
	submit: () => Promise<void>
	control?: Control<any, any>
}

export const Form = forwardRef<IFormHandler, AuthFormProps<any>>(
	({ fields, defaultValues, onSubmit, validationRules, title }, ref) => {
		const form = useForm<any>({
			defaultValues,
			mode: 'all',
			reValidateMode: 'onChange'
		})

		const submit: SubmitHandler<any> = async (data) => {
			onSubmit?.(data)
			form.reset({}, { keepValues: false })
		}

		useImperativeHandle(ref, () => ({
			submit: form.handleSubmit(submit),
			control: form.control
		}))

		return (
			<FormProvider {...form}>
				<Text style={styles.title}>{title}</Text>
				{fields.map((field) => {
					return (
						<Controller
							name={field.name as string}
							key={field.name as string}
							control={form.control}
							rules={validationRules?.[field.name]}
							render={({ field: _field, fieldState: { error }, ...props }) => {
								return (
									<Input
										{...props}
										ref={_field.ref}
										placeholder={field.placeholder}
										label={field.label}
										returnKeyType="next"
										onBlur={_field.onBlur}
										errorMessage={error?.message}
										onChangeText={_field.onChange}
										hasError={!!error?.message}
									/>
								)
							}}
						/>
					)
				})}
			</FormProvider>
		)
	}
)

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 20,
		color: Colors.light.white
	}
})

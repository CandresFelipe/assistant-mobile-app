const colors = {
	blueAccent: {
		100: '#d7ddfd',
		200: '#afbcfb',
		300: '#879af9',
		400: '#5f79f7',
		500: '#3757f5',
		600: '#2c46c4',
		700: '#213493',
		800: '#162362',
		900: '#0b1131'
	},
	greyAccent: {
		100: '#ffffff', // white
		200: '#f0f0f0', // very light grey
		300: '#d9d9d9', // light grey
		400: '#bfbfbf', // grey
		500: '#a6a6a6', // medium grey
		600: '#8c8c8c', // dark grey
		700: '#737373', // darker grey
		800: '#595959', // very dark grey
		900: '#404040', // almost black
		1000: '#262626' // near black
	},
	warning: {
		100: '#ffe0a3',
		200: '#ffbf66',
		500: '#f57c00'
	},
	success: {
		100: '#b3e6b3',
		200: '#66bb6a',
		500: '#388e3c'
	},
	error: {
		100: '#ffa0a0',
		200: '#ff7664',
		500: '#8e2525'
	}
}

export type ColorTheme = {
	primary: string
	secondary: string
	textSecondary: string
	textPrimary: string
}

const sharedColors = {
	black: '#000000',
	white: '#FFFFFF'
}

type SharedColors = typeof sharedColors

export type TColors = ColorTheme & SharedColors

type ColorsPalette = {
	light: TColors
	dark: TColors
	success: ColorTheme
	warning: ColorTheme
	error: ColorTheme
}

const Colors: ColorsPalette = {
	light: {
		primary: colors.blueAccent[400],
		secondary: colors.blueAccent[800],
		textPrimary: colors.greyAccent[1000],
		textSecondary: colors.greyAccent[400],
		...sharedColors
	},
	dark: {
		primary: colors.blueAccent[900],
		secondary: colors.blueAccent[200],
		textPrimary: colors.greyAccent[200],
		textSecondary: colors.greyAccent[300],
		...sharedColors
	},
	success: {
		primary: colors.success[500],
		secondary: colors.success[200],
		textPrimary: colors.success[100],
		textSecondary: colors.success[200]
	},
	warning: {
		primary: colors.warning[500],
		secondary: colors.warning[200],
		textPrimary: colors.warning[100],
		textSecondary: colors.warning[200]
	},
	error: {
		primary: colors.error[500],
		secondary: colors.error[200],
		textPrimary: colors.error[100],
		textSecondary: colors.error[200]
	}
}

export default Colors

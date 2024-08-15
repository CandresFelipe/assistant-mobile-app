module.exports = {
	extends: ['expo', 'prettier', 'universe/native'],
	plugins: ['prettier', '@typescript-eslint'],
	rules: {
		'prettier/prettier': 'error',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/consistent-type-definitions': ['interface' | 'type'],
		'react/display-name': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-floating-promises': 'off'
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	]
}

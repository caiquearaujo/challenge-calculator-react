module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			tsx: true,
		},
	},
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'import', 'react'],
	ignorePatterns: [],
	settings: {
		react: {
			version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
	rules: {
		// typescript rules
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		// allow paren-less arrow functions
		'arrow-parens': ['error', 'as-needed'],
		// set maximum line characters
		'max-len': [
			'error',
			140,
			4,
			{
				ignoreUrls: true,
				ignoreTemplateLiterals: true,
				ignoreStrings: true,
			},
		],
		'max-statements': ['error', 24],
		quotes: [
			'error',
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true,
			},
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'only-multiline',
			},
		],
		// allow debugger during development
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger':
			process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-return-assign': 'off',
		'no-unused-vars': 'error',
		'no-empty': 'error',
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'space-before-function-paren': 'off',
		'no-return-await': 'warn',
		'object-shorthand': ['error', 'always'],
		'no-extra-semi': 'error',
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: true,
			},
		],
		'no-prototype-builtins': 'off',
		'no-void': 'off',
		'no-case-declarations': 'off',
		'no-var': 'error',
		'react/prop-types': 'off',
	},
};

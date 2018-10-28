module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['plugin:jest/recommended'],
	plugins: [
		'babel',
		'import',
		'prettier',
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	}
};

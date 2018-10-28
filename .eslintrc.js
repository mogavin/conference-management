module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['plugin:jest/recommended', 'plugin:prettier/recommended'],
	plugins: [
		'babel',
		'import',
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	}
};

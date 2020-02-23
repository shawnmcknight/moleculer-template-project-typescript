module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
	],
	env: {
		node: true,
		commonjs: true,
		es2017: true,
		jest: true,
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	overrides: [
		{
			files: ["*.js"],
			rules: {
				// ignore typescript rules
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/member-ordering": "off",
				"@typescript-eslint/explicit-member-accessibility": "off",
			},
		},
	],
};

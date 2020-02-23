module.exports = {
	ignore: ["**/*.d.ts"],
	env: {
		build: { ignore: ["**/*.test.ts", "**/__mocks__/**"] },
		debug: { sourceMaps: true, retainLines: true },
	},
	presets: [["@babel/env", { targets: { node: true } }], "@babel/typescript"],
	plugins: ["@babel/proposal-class-properties"],
};

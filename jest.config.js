module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	collectCoverage: true,
	coverageDirectory: "coverage",
	transform: {
		"\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }],
	},
};

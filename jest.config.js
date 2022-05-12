module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60,
		},
	},
	coveragePathIgnorePatterns: ['./node_modules/', './test/'],
	coverageReporters: ['json-summary', 'text', 'lcov'],
	moduleNameMapper: {
		'@(.*)$': '<rootDir>/src/$1',
	},
};

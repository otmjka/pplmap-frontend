module.exports = {
  collectCoverage: true,
  setupFilesAfterEnv: ['jest-extended'],
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};

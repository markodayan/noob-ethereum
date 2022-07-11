const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  testTimeout: 30000,
  testMatch: ['<rootDir>/src/test/**/*.test.ts'],
};

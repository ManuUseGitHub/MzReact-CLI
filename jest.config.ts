import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    "^.+\\.(t|j)s?$": "ts-jest",
  }
};

export default config;
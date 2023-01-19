// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: '<rootDir>/src/test/environment.js',
  /**
   * Map our module path aliases, so that Jest can understand modules loaded using "@/common" and load the proper file.
   * Required, or Jest will fail to import dependencies from tests.
   *
   * @see https://nextjs.org/docs/advanced-features/module-path-aliases
   * @see https://nextjs.org/docs/testing#setting-up-jest-with-babel
   */
   moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@layouts/(.*)$': '<rootDir>/src/components/layouts/$1',
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@actions/(.*)$': '<rootDir>/src/actions/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
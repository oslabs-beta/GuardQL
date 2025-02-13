// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     moduleNameMapper: {
//       '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
//       '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
//       '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
//     },
//     setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
//     testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/server/'],
//     transform: {
//       '^.+\\.(ts|tsx)$': 'ts-jest'
//     },
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//     rootDir: '.',
//     modulePaths: ['<rootDir>/src'],
//     testMatch: ['**/src/client/**/__tests__/**/*.[jt]s?(x)', '**/src/client/**/?(*.)+(spec|test).[jt]s?(x)']
//   };
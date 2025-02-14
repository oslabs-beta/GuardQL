module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',  // Changed to 'node' for server tests
    setupFilesAfterEnv: ['<rootDir>/jest.setup.mts'], 
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/client/'],
    transform: {
      '^.+\\.(ts|mts)$': ['ts-jest', {
        useESM: true,  // Enable ESM support
      }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'mts', 'json', 'node'],  // Added mts and mjs
    rootDir: '.',
    modulePaths: ['<rootDir>/src'],
    testMatch: ['**/src/server/**/__tests__/**/*.[jt]s?(x)', '**/src/server/**/?(*.)+(spec|test).[jt]s?(x)'],
    extensionsToTreatAsEsm: ['.ts', '.mts'],  // Tell Jest to treat these as ESM
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.mjs$': '$1',  // Handle .mjs imports
      '^(\\.{1,2}/.*)\\.mts$': '$1'   // Handle .mts imports
    }
  };
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json"
    }
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testMatch: [ 
    "**/__tests__/**/*.ts", 
    "**/?(*.)+(spec|test).ts" 
  ],
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules"
  ],
  coverageReporters: [
    "json",
    "lcov",
    "text"
  ],
  coverageThreshold: {
    "global": {
      "branches": 62,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },
};
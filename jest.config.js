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
};
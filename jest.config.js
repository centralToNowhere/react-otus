module.exports = {
  verbose: true,
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/dist",
    "<rootDir>/build",
  ],
  snapshotSerializers: [
    "@emotion/jest/serializer" /* if needed other snapshotSerializers should go here */,
  ],
  setupFilesAfterEnv: ["<rootDir>/src/jest-setup.ts"],
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/dist"],
  setupFilesAfterEnv: ["<rootDir>/src/lesson3/index.test.js"],
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};

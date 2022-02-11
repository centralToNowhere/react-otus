import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
fetchMock.dontMock();

// jest.resetModules + react https://github.com/facebook/jest/issues/8987
let mockActualReact: jest.Mock;
jest.doMock("react", () => {
  if (!mockActualReact) {
    mockActualReact = jest.requireActual("react");
  }
  return mockActualReact;
});

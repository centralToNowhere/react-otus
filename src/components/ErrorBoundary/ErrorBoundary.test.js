/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable @typescript-eslint/no-empty-function */

import React from "react";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("error boundary tests", () => {
  it("should render error message", () => {
    const Child = () => {
      throw new TypeError("Error boundary works");
    };

    const { getByText } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    const errorMessage = getByText("Error boundary works");
    expect(errorMessage).toBeDefined();
  });
});

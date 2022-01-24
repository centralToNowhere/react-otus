/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ErrorBoundary from "./Error";

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

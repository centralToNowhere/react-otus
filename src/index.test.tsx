import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("index tests", () => {
  it("should render App", () => {
    const { asFragment } = render(<App />);
    const fieldContainer = screen.getByTestId("react-lifecycle");

    expect(fieldContainer).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

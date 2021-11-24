import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import figures from "@/components/Field/figures.json";

beforeAll(() => {
  fetchMock.doMock();
  fetchMock.mockIf("/figures.json", JSON.stringify(figures));
});

describe("index tests", () => {
  it("should render App", () => {
    render(<App />);
    const fieldContainer = screen.getByTestId("react-lifecycle");

    expect(fieldContainer).toBeInTheDocument();
  });
});

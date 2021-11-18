import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("index tests", () => {
  it("should render App", () => {
    render(<App />);
    const title = screen.getByText("React typescript template");

    expect(title).toBeVisible();
  });
});

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("index tests", () => {
  it("should render app", () => {
    render(<App />);

    expect(screen.queryByText("Hello, TypeScript!")).toBeVisible();
  });
});

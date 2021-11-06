import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import Field from "./components/Field";

describe("index tests", () => {
  it("should render field", () => {
    render(<App />);
    const field = screen.queryByTestId("field");

    expect(field).toBeVisible();
  });

  it("should render list", () => {
    render(<App />);
    const list = screen.queryByTestId("list-cells");

    expect(list).toBeVisible();
  });

  it("should render random cells", () => {
    render(
      <Provider store={store}>
        <Field rowSize="10" backgroundColor="white" />
      </Provider>
    );
    const cells = screen.queryAllByTestId("cell");

    expect(cells).toHaveLength(100);

    for (const cell of cells) {
      expect(cell).toBeVisible();
    }
  });
});

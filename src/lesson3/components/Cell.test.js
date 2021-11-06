import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Cell from "./Cell";

describe("cell tests", () => {
  it("should render alive cell", () => {
    const width = 30;
    const bg = "rgb(123,231,132)";
    const number = 1;
    const alive = true;

    render(
      <Cell width={width} number={number} backgroundColor={bg} alive={alive} />
    );

    const cell = screen.getByText(String(number));
    expect(cell).toBeVisible();
    expect(cell).toHaveStyle({
      width: 30,
      backgroundColor: bg,
    });
  });

  it("should render dead cell", () => {
    const width = 30;
    const bg = "rgb(123,231,132)";
    const number = 1;
    const alive = false;

    render(
      <Cell width={width} number={number} backgroundColor={bg} alive={alive} />
    );

    const cell = screen.getByTestId("cell");
    expect(cell).toBeEmptyDOMElement();
    expect(cell).not.toHaveStyle({
      backgroundColor: bg,
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { Field } from "./Field";

const cellSize = 40;
const cellsInRow = 15;
const cellsInCol = 10;

describe("Field tests", () => {
  it("should render field", () => {
    const { asFragment } = render(
      <Field
        cellSize={cellSize}
        cellsInRow={cellsInRow}
        cellsInCol={cellsInCol}
      />
    );

    const field = screen.getByTestId("field");

    expect(field).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render 150 inactive cells", () => {
    render(
      <Field
        cellSize={cellSize}
        cellsInRow={cellsInRow}
        cellsInCol={cellsInCol}
      />
    );

    const cells: HTMLElement[] = screen.getAllByTestId("cell");
    expect(cells.length).toBe(150);

    cells.forEach((cell) => {
      expect(cell).not.toHaveStyle({
        background: "black",
      });
    });
  });
});

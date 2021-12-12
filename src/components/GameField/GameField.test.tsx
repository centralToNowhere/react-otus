import React from "react";
import { render, screen } from "@testing-library/react";
import { GameField } from "./GameField";

const cellSize = 40;
const cellsInRow = 15;
const cellsInCol = 10;

describe("GameField tests", () => {
  it("should render game field", () => {
    const { asFragment } = render(
      <GameField
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
      <GameField
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

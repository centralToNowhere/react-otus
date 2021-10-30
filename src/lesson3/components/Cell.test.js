import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

describe("cell tests", () => {
  it("should render a cell", () => {
    const handleClick = jest.fn();
    const width = 30;
    const bg = "rgb(123,231,132)";
    const number = 1;
    const alive = true;

    render(
      <Cell
        width={width}
        onCellClick={handleClick}
        number={number}
        backgroundColor={bg}
        alive={alive}
      />
    );

    const cell = screen.getByText(String(number));
    expect(cell).toBeVisible();
    expect(cell).toHaveStyle({
      width: 30,
      backgroundColor: bg,
    });
  });

  it("should call click handler", () => {
    const handleClick = jest.fn();
    const width = 30;
    const bg = "rgb(123,231,132)";
    const number = 1;
    const alive = true;

    render(
      <Cell
        width={width}
        onCellClick={handleClick}
        number={number}
        backgroundColor={bg}
        alive={alive}
      />
    );

    fireEvent.click(screen.getByText(String(number)));
    expect(handleClick).toBeCalledWith(number);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

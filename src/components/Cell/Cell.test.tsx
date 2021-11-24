import React from "react";
import { render, screen } from "@testing-library/react";
import { Cell } from "./Cell";

describe("Cell tests", () => {
  it("should render cell", () => {
    const { asFragment } = render(
      <Cell size={30} isActive={true} number={1} />
    );

    const cell = screen.getByTestId("cell");

    expect(cell).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render active cell", () => {
    render(<Cell size={30} isActive={true} number={1} />);

    const cell = screen.getByTestId("cell");

    expect(cell).toHaveStyle({
      background: "black",
    });
  });

  it("should render inactive cell", () => {
    render(<Cell size={30} isActive={false} number={1} />);

    const cell = screen.getByTestId("cell");

    expect(cell).not.toHaveStyle({
      background: "black",
    });
  });
});

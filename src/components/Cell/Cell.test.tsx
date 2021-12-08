import React from "react";
import { render, screen } from "@testing-library/react";
import { Cell } from "./Cell";
import { COLORS } from "@/styles/ui-styled";

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
      background: COLORS.activeCellBg,
    });
  });

  it("should render inactive cell", () => {
    render(<Cell size={30} isActive={false} number={1} />);

    const cell = screen.getByTestId("cell");

    expect(cell).not.toHaveStyle({
      background: COLORS.activeCellBg,
    });
  });
});

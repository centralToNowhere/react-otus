import React from "react";
import { render, screen } from "@testing-library/react";
import { Cell } from "./Cell";

describe("Cell tests", () => {
  it("should render cell", () => {
    const { asFragment } = render(
      <Cell cssClassName={"cell cell-active"} isActive={1} number={1} />
    );

    const cell = screen.getByTestId("cell");

    expect(cell).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

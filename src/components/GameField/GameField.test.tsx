import React from "react";
import { render, screen } from "@/utils/test-utils";
import { GameField } from "@/components/GameField";

describe("GameField tests", () => {
  it("should render game field", () => {
    const { asFragment } = render(<GameField />, {
      preloadedState: {
        fieldControl: {
          cellSize: 40,
          maxFieldWidth: 600,
          maxFieldHeight: 400,
          capacity: 50,
          speed: 2,
        },
      },
    });

    const field = screen.getByTestId("field");

    expect(field).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render 150 inactive cells", () => {
    render(<GameField />, {
      preloadedState: {
        fieldControl: {
          cellSize: 40,
          maxFieldWidth: 600,
          maxFieldHeight: 400,
          capacity: 50,
          speed: 2,
        },
      },
    });

    const cells: HTMLElement[] = screen.getAllByTestId("cell");
    expect(cells.length).toBe(150);

    cells.forEach((cell) => {
      expect(cell).not.toHaveStyle({
        background: "black",
      });
    });
  });
});

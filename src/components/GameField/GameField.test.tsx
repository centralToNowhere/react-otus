import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { GameField } from "@/components/GameField";
import { Main } from "@/components/GameField/GameField";
import userEvent from "@testing-library/user-event/dist";
import { COLORS } from "@/styles/ui-styled";
import { getInitialCells } from "@/utils/CellGenerator";

const initialState = {
  fieldControl: {
    cellSize: 40,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 2,
  },
  gameField: {
    activeCells: getInitialCells(600, 400, 40),
    gameInProgress: false,
  },
};

describe("GameField tests", () => {
  it("should render game field", () => {
    const { asFragment } = render(<GameField />, {
      preloadedState: initialState,
    });

    const field = screen.getByTestId("field");

    expect(field).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render 150 inactive cells", () => {
    render(<GameField />, {
      preloadedState: initialState,
    });

    const cells: HTMLElement[] = screen.getAllByTestId("cell");
    expect(cells.length).toBe(150);

    cells.forEach((cell) => {
      expect(cell).not.toHaveStyle({
        background: "black",
      });
    });
  });

  describe("cell toggle tests", () => {
    it("should toggle cell inactive -> active", async () => {
      render(<GameField />, {
        preloadedState: {
          ...initialState,
          fieldControl: {
            ...initialState.fieldControl,
            cellSize: 40,
            maxFieldWidth: 40,
            maxFieldHeight: 40,
          },
          gameField: {
            activeCells: [],
            gameInProgress: false,
          },
        },
      });

      const cell = screen.getByTestId("cell");

      userEvent.click(cell);

      await waitFor(() => {
        expect(cell).toHaveStyle({
          background: COLORS.activeCellBg,
        });
      });
    });

    it("should toggle cell active -> inactive", async () => {
      render(<GameField />, {
        preloadedState: {
          ...initialState,
          fieldControl: {
            ...initialState.fieldControl,
            cellSize: 40,
            maxFieldWidth: 40,
            maxFieldHeight: 40,
          },
          gameField: {
            activeCells: [
              {
                x: 0,
                y: 0,
              },
            ],
            gameInProgress: false,
          },
        },
      });

      const cell = screen.getByTestId("cell");

      userEvent.click(cell);

      await waitFor(() => {
        expect(cell).not.toHaveStyle({
          background: COLORS.activeCellBg,
        });
      });
    });
  });

  it("should not toggle if cell number not set", async () => {
    jest
      .spyOn(Main.prototype, "renderCells")
      .mockReturnValue([
        <div
          className="cell"
          key={0}
          data-testid={"cell"}
          data-state={false}
          aria-label={String(NaN)}
        />,
      ]);

    render(<GameField />, {
      preloadedState: {
        ...initialState,
        fieldControl: {
          ...initialState.fieldControl,
          cellSize: 40,
          maxFieldWidth: 40,
          maxFieldHeight: 40,
        },
      },
    });

    const cell = screen.getByTestId("cell");

    userEvent.click(cell);

    await waitFor(() => {
      expect(cell).not.toHaveStyle({
        background: COLORS.activeCellBg,
      });
    });
  });
});

import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { GameField } from "@/components/GameField";
import userEvent from "@testing-library/user-event/dist";
import { COLORS } from "@/styles/ui-styled";
import { getInitialCells } from "@/utils/CellGenerator";
import { initialStateAllForTests } from "@/store/redux/store";
import { l10n } from "@/l10n/ru";
import { GameContainer } from "@/screens/Game";

const initialState = {
  ...initialStateAllForTests,
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
    generations: 0,
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
      preloadedState: {
        ...initialState,
        fieldControl: {
          cellSize: 40,
          maxFieldWidth: 600,
          maxFieldHeight: 400,
          capacity: 50,
          speed: 2,
        },
        gameField: {
          ...initialState.gameField,
          activeCells: [],
        },
      },
    });

    const cells: HTMLElement[] = screen.getAllByTestId("cell");
    expect(cells.length).toBe(150);

    cells.forEach((cell) => {
      expect(cell).not.toHaveStyle({
        background: COLORS.activeCellBg,
      });
    });
  });

  describe("gameField css styles", () => {
    describe("gameField animation", () => {
      it("cells amount < 1000 - transition: 0.5s ease background", () => {
        render(<GameField />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              cellSize: 10,
              maxFieldWidth: 100,
              maxFieldHeight: 100,
            },
          },
        });

        const cells = screen.getAllByTestId("cell");

        expect(cells[0]).toHaveStyle({
          transition: "0.5s ease background",
        });
      });

      it("cells amount > 1000 - transition: none", () => {
        render(<GameField />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              cellSize: 10,
              maxFieldWidth: 200,
              maxFieldHeight: 1000,
            },
          },
        });

        const cells = screen.getAllByTestId("cell");

        expect(cells[0]).toHaveStyle({
          transition: "none",
        });
      });

      it("cells amount === 1000 - transition: none", () => {
        render(<GameField />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              cellSize: 10,
              maxFieldWidth: 1000,
              maxFieldHeight: 100,
            },
          },
        });

        const cells = screen.getAllByTestId("cell");

        expect(cells[0]).toHaveStyle({
          transition: "none",
        });
      });
    });

    describe("gameField border", () => {
      it(`cells size > 2 - border: 1px solid ${COLORS.secondary}`, () => {
        render(<GameField />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              cellSize: 3,
              maxFieldWidth: 10,
              maxFieldHeight: 10,
            },
          },
        });

        const cells = screen.getAllByTestId("cell");

        expect(cells[0]).toHaveStyle({
          border: `1px solid ${COLORS.secondary}`,
        });
      });

      it(`cells size === 2 - border: none`, () => {
        render(<GameField />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              cellSize: 2,
              maxFieldWidth: 10,
              maxFieldHeight: 10,
            },
          },
        });

        const cells = screen.getAllByTestId("cell");

        expect(cells[0]).toHaveStyle({
          border: "none",
        });
      });

      it(`cells size < 2 - border: none`, () => {
        render(<GameField />, {
          preloadedState: {
            ...initialState,
            fieldControl: {
              ...initialState.fieldControl,
              cellSize: 1,
              maxFieldWidth: 10,
              maxFieldHeight: 10,
            },
          },
        });

        const cells = screen.getAllByTestId("cell");

        expect(cells[0]).toHaveStyle({
          border: "none",
        });
      });
    });
  });

  describe("cell state tests", () => {
    it("should toggle cell inactive -> active", async () => {
      render(<GameField />, {
        preloadedState: {
          ...initialState,
          fieldControl: {
            ...initialState.fieldControl,
            cellSize: 10,
            maxFieldWidth: 100,
            maxFieldHeight: 100,
          },
          gameField: {
            ...initialState.gameField,
            activeCells: [],
          },
        },
      });

      const cells = screen.getAllByTestId("cell");

      userEvent.click(cells[44]);

      await waitFor(() => {
        expect(cells[44]).toHaveStyle({
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
            cellSize: 10,
            maxFieldWidth: 100,
            maxFieldHeight: 100,
          },
          gameField: {
            ...initialState.gameField,
            activeCells: [
              {
                x: 4,
                y: 4,
              },
            ],
          },
        },
      });

      const cells = screen.getAllByTestId("cell");

      expect(cells[44]).toHaveStyle({
        background: COLORS.activeCellBg,
      });

      userEvent.click(cells[44]);

      await waitFor(() => {
        expect(cells[44]).not.toHaveStyle({
          background: COLORS.activeCellBg,
        });
      });
    });

    it("should highlight figure cells on cell hover", async () => {
      render(<GameField />, {
        preloadedState: {
          ...initialState,
          figurePalette: {
            ...initialState.figurePalette,
            figures: [
              {
                name: "Figure",
                indexedCells: [1, 0, 1, 0, 1, 1, 0, 0, 0],
                cellsInRow: 3,
                cellsInCol: 3,
              },
            ],
            figurePaletteActive: true,
          },
          fieldControl: {
            ...initialState.fieldControl,
            cellSize: 10,
            maxFieldWidth: 30,
            maxFieldHeight: 30,
          },
        },
      });

      const cells = screen.getAllByTestId("cell");

      userEvent.hover(cells[0]);

      await waitFor(() => {
        expect(cells[0]).toHaveStyle({
          background: COLORS.accentFade,
        });
      });

      cells.forEach((cell) => {
        expect(cell).toHaveClass("cell-highlight");
      });
    });

    it("should remove figure cells highlight on cell unhover", async () => {
      render(<GameField />, {
        preloadedState: {
          ...initialState,
          figurePalette: {
            ...initialState.figurePalette,
            figures: [
              {
                name: "Figure",
                indexedCells: [1, 0, 1, 0, 1, 1, 0, 0, 0],
                cellsInRow: 3,
                cellsInCol: 3,
              },
            ],
            figurePaletteActive: true,
          },
          fieldControl: {
            ...initialState.fieldControl,
            cellSize: 10,
            maxFieldWidth: 30,
            maxFieldHeight: 30,
          },
        },
      });

      const field = screen.getByTestId("field");
      const cells = screen.getAllByTestId("cell");

      userEvent.hover(cells[0]);

      await waitFor(() => {
        expect(cells[0]).toHaveStyle({
          background: COLORS.accentFade,
        });
      });

      userEvent.unhover(field);

      await waitFor(() => {
        expect(cells[0]).not.toHaveStyle({
          background: COLORS.accentFade,
        });
      });

      cells.forEach((cell) => {
        expect(cell).not.toHaveClass("cell-highlight");
      });
    });

    it("should remove figure cells highlight on figurePaletteActive: false", async () => {
      render(<GameContainer />, {
        preloadedState: {
          ...initialState,
          figurePalette: {
            ...initialState.figurePalette,
            figures: [
              {
                name: "Figure",
                indexedCells: [1, 0, 1, 0, 1, 1, 0, 0, 0],
                cellsInRow: 3,
                cellsInCol: 3,
              },
            ],
            figurePaletteActive: true,
          },
          fieldControl: {
            ...initialState.fieldControl,
            cellSize: 10,
            maxFieldWidth: 30,
            maxFieldHeight: 30,
          },
        },
      });

      const cells = screen.getAllByTestId("cell");

      userEvent.hover(cells[0]);

      await waitFor(() => {
        expect(cells[0]).toHaveStyle({
          background: COLORS.accentFade,
        });
      });

      const paletteStateButton = screen.getByText(l10n.paletteActiveCancelText);

      userEvent.click(paletteStateButton);

      await waitFor(() => {
        expect(cells[0]).not.toHaveStyle({
          background: COLORS.accentFade,
        });
      });

      cells.forEach((cell) => {
        expect(cell).not.toHaveClass("cell-highlight");
      });
    });
  });
});

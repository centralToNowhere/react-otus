import React from "react";
import { FigurePaletteContainer } from "@/components/FigurePalette";
import { render, screen, within } from "@/utils/test-utils";
import { IFigurePaletteState } from "@/components/FigurePalette/slice";
import { COLORS } from "@/styles/ui-styled";
import userEvent from "@testing-library/user-event/dist";

const initialState: {
  figurePalette: IFigurePaletteState;
} = {
  figurePalette: {
    figures: [
      {
        name: "First figure",
        indexedCells: [
          1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
          0, 1,
        ],
        cellsInRow: 5,
        cellsInCol: 5,
      },
      {
        name: "Second figure",
        indexedCells: [1, 0, 1, 0, 1, 1, 0, 0, 0],
        cellsInRow: 3,
        cellsInCol: 3,
      },
      {
        name: "Third figure",
        indexedCells: [
          1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1,
          0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1,
          0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
          0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
          0, 0, 1, 1, 0, 0, 0, 1,
        ],
        cellsInRow: 10,
        cellsInCol: 10,
      },
    ],
  },
};

describe("FigurePalette tests", () => {
  it("should render FigurePalette", () => {
    const { asFragment } = render(<FigurePaletteContainer />, {
      preloadedState: initialState,
    });

    const PaletteContainer = screen.getByTestId("figurePalette");
    const FigureName = screen.getByText("First figure");
    const PaletteGameField = within(PaletteContainer).getByTestId("field");
    const PrevArrow = within(PaletteContainer).getByLabelText("prev");
    const NextArrow = within(PaletteContainer).getByLabelText("next");

    expect(asFragment()).toMatchSnapshot();
    expect(PaletteContainer).toBeInTheDocument();
    expect(FigureName).toBeInTheDocument();
    expect(PaletteGameField).toBeInTheDocument();
    expect(PrevArrow).toBeInTheDocument();
    expect(NextArrow).toBeInTheDocument();
  });

  it("should render 5 x 5 figure inside palette", () => {
    render(<FigurePaletteContainer />, {
      preloadedState: initialState,
    });

    const PaletteContainer = screen.getByTestId("figurePalette");
    const PaletteGameField = within(PaletteContainer).getByTestId("field");
    const cells: HTMLElement[] =
      within(PaletteGameField).getAllByTestId("cell");

    expect(cells.length).toBe(25);

    const indexedCells = initialState.figurePalette.figures[0].indexedCells;

    cells.forEach((cell, i) => {
      if (indexedCells[i]) {
        expect(cell).toHaveStyle({
          background: COLORS.activeCellBg,
        });
      } else {
        expect(cell).not.toHaveStyle({
          background: COLORS.activeCellBg,
        });
      }
    });
  });

  it("should not switch prev figure", async () => {
    render(<FigurePaletteContainer />, {
      preloadedState: initialState,
    });

    const PaletteContainer = screen.getByTestId("figurePalette");
    const PrevArrow = within(PaletteContainer).getByLabelText("prev");
    const PaletteGameField = within(PaletteContainer).getByTestId("field");

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(25);
    userEvent.click(PrevArrow);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(25);
  });

  it("should not switch to next figure", async () => {
    render(<FigurePaletteContainer />, {
      preloadedState: {
        ...initialState,
        figurePalette: {
          figures: [
            {
              name: "First figure",
              indexedCells: [
                1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1,
                0, 0, 0, 1,
              ],
              cellsInRow: 5,
              cellsInCol: 5,
            },
          ],
        },
      },
    });

    const PaletteContainer = screen.getByTestId("figurePalette");
    const NextArrow = within(PaletteContainer).getByLabelText("next");
    const PaletteGameField = within(PaletteContainer).getByTestId("field");

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(25);
    userEvent.click(NextArrow);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(25);
  });

  it("should switch to next figure", async () => {
    render(<FigurePaletteContainer />, {
      preloadedState: initialState,
    });

    const PaletteContainer = screen.getByTestId("figurePalette");
    const NextArrow = within(PaletteContainer).getByLabelText("next");
    const PaletteGameField = within(PaletteContainer).getByTestId("field");

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(25);
    userEvent.click(NextArrow);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(9);
    userEvent.click(NextArrow);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(100);
  });

  it("should switch to prev figure", async () => {
    render(<FigurePaletteContainer />, {
      preloadedState: initialState,
    });

    const PaletteContainer = screen.getByTestId("figurePalette");
    const NextArrow = within(PaletteContainer).getByLabelText("next");
    const PrevArrow = within(PaletteContainer).getByLabelText("prev");
    const PaletteGameField = within(PaletteContainer).getByTestId("field");

    userEvent.click(NextArrow);
    userEvent.click(NextArrow);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(100);
    userEvent.click(PrevArrow);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(9);
    userEvent.click(PrevArrow);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    expect(within(PaletteGameField).getAllByTestId("cell").length).toBe(25);
  });
});

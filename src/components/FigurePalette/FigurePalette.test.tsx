import React from "react";
import {
  FigurePaletteContainer,
  paletteActiveCancelText,
  paletteActiveText,
} from "@/components/FigurePalette";
import { render, screen, within, waitFor } from "@/utils/test-utils";
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
    figurePaletteActive: false,
    currentFigureIndex: 0,
  },
};

describe("FigurePalette tests", () => {
  it("should render FigurePalette", () => {
    const { asFragment } = render(<FigurePaletteContainer />, {
      preloadedState: initialState,
    });

    const PaletteContainer = screen.getByTestId("figurePalette");
    const FigureName = screen.getByText("First figure");
    const PaletteStateButton = screen.getByText(paletteActiveText);
    const RotationButton = screen.getByLabelText("rotate");
    const PaletteGameField = within(PaletteContainer).getByTestId("field");
    const PrevArrow = within(PaletteContainer).getByLabelText("prev");
    const NextArrow = within(PaletteContainer).getByLabelText("next");

    expect(asFragment()).toMatchSnapshot();
    expect(PaletteContainer).toBeInTheDocument();
    expect(FigureName).toBeInTheDocument();
    expect(PaletteStateButton).toBeInTheDocument();
    expect(RotationButton).toBeInTheDocument();
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
          currentFigureIndex: 0,
          figurePaletteActive: false,
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

  it("should change palette button text to cancel state", () => {
    render(<FigurePaletteContainer />, {
      preloadedState: initialState,
    });

    const paletteStateButton = screen.getByText(paletteActiveText);

    userEvent.click(paletteStateButton);

    expect(paletteStateButton).toHaveTextContent(paletteActiveCancelText);
  });

  it("should change palette button text to active", () => {
    render(<FigurePaletteContainer />, {
      preloadedState: {
        ...initialState,
        figurePalette: {
          ...initialState.figurePalette,
          figurePaletteActive: true,
        },
      },
    });

    const paletteStateButton = screen.getByText(paletteActiveCancelText);

    userEvent.click(paletteStateButton);

    expect(paletteStateButton).toHaveTextContent(paletteActiveText);
  });

  it("should rotate figure on rotate button click", async () => {
    const { store } = render(<FigurePaletteContainer />, {
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
          currentFigureIndex: 0,
        },
      },
    });

    const rotations = [
      [1, 1, 0, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 0, 0, 1, 1],
      [1, 0, 1, 0, 1, 1, 0, 0, 0],
    ];

    const rotateButton = screen.getByLabelText("rotate");

    await rotations.reduce((promise, rotation) => {
      return promise.then(() => {
        userEvent.click(rotateButton);

        return waitFor(() => {
          expect(store.getState().figurePalette).toEqual(
            expect.objectContaining({
              figures: [
                {
                  name: "Figure",
                  indexedCells: rotation,
                  cellsInRow: 3,
                  cellsInCol: 3,
                },
              ],
            })
          );
        });
      });
    }, Promise.resolve());
  });
});

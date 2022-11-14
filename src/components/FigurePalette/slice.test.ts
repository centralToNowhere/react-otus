import {
  figurePaletteSlice,
  setFigures,
  setFigurePaletteActive,
  setCurrentFigureIndex,
  resetPalette,
  IFigurePaletteState,
  CellFigure,
} from "@/components/FigurePalette";

const initialState: IFigurePaletteState = {
  figures: [],
  figurePaletteActive: false,
  currentFigureIndex: 0,
};

describe("figurePalette slice tests", () => {
  it("setFigures", () => {
    const figures: CellFigure[] = [
      {
        name: "New figure",
        indexedCells: [1, 1, 0, 0],
        cellsInCol: 2,
        cellsInRow: 2,
      },
    ];

    const resultState = figurePaletteSlice.reducer(
      initialState,
      setFigures(figures)
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        figures,
      })
    );
  });

  it("setFigurePaletteActive", () => {
    const resultState = figurePaletteSlice.reducer(
      initialState,
      setFigurePaletteActive(true)
    );

    expect(resultState.figurePaletteActive).toBe(true);
  });

  it("setCurrentFigureIndex", () => {
    const figures: CellFigure[] = [
      {
        name: "figure 1",
        indexedCells: [1, 1, 0, 0],
        cellsInCol: 2,
        cellsInRow: 2,
      },
      {
        name: "figure 2",
        indexedCells: [1, 1, 1, 1],
        cellsInCol: 4,
        cellsInRow: 1,
      },
      {
        name: "figure 3",
        indexedCells: [1, 1, 1, 1, 0, 0],
        cellsInCol: 2,
        cellsInRow: 3,
      },
    ];

    const resultState = figurePaletteSlice.reducer(
      {
        ...initialState,
        figures,
      },
      setCurrentFigureIndex(2)
    );

    expect(resultState.currentFigureIndex).toBe(2);
  });

  it("resetPalette", () => {
    const paletteState: IFigurePaletteState = {
      figures: [],
      figurePaletteActive: true,
      currentFigureIndex: 1,
    };

    const resultState = figurePaletteSlice.reducer(
      paletteState,
      resetPalette()
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        ...figurePaletteSlice.getInitialState(),
      })
    );
  });
});

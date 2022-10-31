import {
  figurePaletteSlice,
  setFigures,
  IFigurePaletteState,
  CellFigure,
} from "@/components/FigurePalette";

describe("figurePalette slice tests", () => {
  it("setFigures", () => {
    const initialState: IFigurePaletteState = {
      figures: [],
      figurePaletteActive: false,
      currentFigureIndex: 0,
    };

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
});

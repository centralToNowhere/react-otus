import { CellFigure } from "@/components/FigurePalette";
import { rotateCellFigure } from "@/utils/RotateCellFigure";

describe("RotateCellFigure tests", () => {
  it(`
    0, 1, 0,
    0, 0, 1,
    1, 1, 1 
      => 90° rotation =>
    0, 1, 1,
    1, 0, 1,
    0, 0, 1
  `, () => {
    const figure: CellFigure = {
      name: "X",
      indexedCells: [0, 1, 0, 0, 0, 1, 1, 1, 1],
      cellsInRow: 3,
      cellsInCol: 3,
    };

    const rotatedFigure = rotateCellFigure(figure);

    expect(rotatedFigure).toEqual({
      ...figure,
      indexedCells: [0, 1, 1, 1, 0, 1, 0, 0, 1],
      cellsInRow: 3,
      cellsInCol: 3,
    });
  });

  it(`
    0, 1, 0, 1, 1,
    0, 0, 1, 0, 0,
    1, 1, 1, 1, 0 
      => 90° rotation =>
    1, 0, 0,
    1, 0, 1,
    0, 1, 1,
    1, 0, 1,
    0, 0, 1
  `, () => {
    const figure: CellFigure = {
      name: "Y",
      indexedCells: [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
      cellsInRow: 5,
      cellsInCol: 3,
    };

    const rotatedFigure = rotateCellFigure(figure);

    expect(rotatedFigure).toEqual({
      ...figure,
      indexedCells: [1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
      cellsInRow: 3,
      cellsInCol: 5,
    });
  });
});

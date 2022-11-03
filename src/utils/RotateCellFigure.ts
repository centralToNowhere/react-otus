import { CellFigure } from "@/components/FigurePalette";
import { IndexedCells } from "@/Cell/Cell";

export const rotateCellFigure = (figure: CellFigure): CellFigure => {
  const indexedCellsRotated: IndexedCells = [];

  for (let i = 0; i < figure.cellsInRow; i++) {
    for (
      let j = figure.cellsInRow - 1 - i;
      j < figure.indexedCells.length;
      j += figure.cellsInRow
    ) {
      indexedCellsRotated.push(figure.indexedCells[j]);
    }
  }

  return {
    ...figure,
    cellsInRow: figure.cellsInCol,
    cellsInCol: figure.cellsInRow,
    indexedCells: indexedCellsRotated,
  };
};

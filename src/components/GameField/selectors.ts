import { createSelector } from "@reduxjs/toolkit";
import { selectCellsInCol, selectCellsInRow } from "@/components/Fields";
import { RootState } from "@/store/redux/store";
import { ICell } from "@/Cell/Cell";

export const selectGameField = (state: RootState) => {
  return state.gameField;
};

export const getIndexedCells = (
  activeCells: ICell[],
  cellsInRow: number,
  cellsInCol: number
) => {
  const indexedCells: Array<1 | 0> = [];

  indexedCells.length = cellsInCol * cellsInRow;
  indexedCells.fill(0);

  return activeCells.reduce((indexed: Array<1 | 0>, cell) => {
    if (cell.y < cellsInCol && cell.x < cellsInRow) {
      const i = cellsInRow * cell.y + cell.x;
      indexed[i] = 1;
    }

    return indexed;
  }, indexedCells);
};

export const selectIndexedCells = createSelector(
  selectGameField,
  selectCellsInRow,
  selectCellsInCol,
  (gameField, cellsInRow, cellsInCol): Array<1 | 0> => {
    return getIndexedCells(gameField.activeCells, cellsInRow, cellsInCol);
  }
);

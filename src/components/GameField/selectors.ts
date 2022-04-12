import { createSelector } from "@reduxjs/toolkit";
import { selectCellsInCol, selectCellsInRow } from "@/components/Fields";
import { RootState } from "@/store/redux/store";
import { ICell, IndexedCells } from "@/Cell/Cell";

export const selectGameField = (state: RootState) => {
  return state.gameField;
};

export const getIndexedCells = (
  activeCells: ICell[],
  cellsInRow: number,
  cellsInCol: number
): IndexedCells => {
  const indexedCells: IndexedCells = [];

  indexedCells.length = cellsInCol * cellsInRow;
  indexedCells.fill(0);

  return activeCells.reduce((indexed: IndexedCells, cell) => {
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
  (gameField, cellsInRow, cellsInCol): IndexedCells => {
    return getIndexedCells(gameField.activeCells, cellsInRow, cellsInCol);
  }
);

export const selectGenerationNumber = createSelector(
  selectGameField,
  (gameField) => {
    return gameField.generations;
  }
);

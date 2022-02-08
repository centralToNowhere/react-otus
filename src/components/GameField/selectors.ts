import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/redux/store";
import { IGameFieldState } from "@/components/GameField/slice";
import { ICell } from "@/components/Cell";

export const selectGameField = (state: RootState) => {
  return state.gameField;
};

export const getIndexedActiveCells = (activeCells: ICell[]) => {
  return activeCells.reduce((indexed: boolean[][], cell) => {
    indexed[cell.y] = indexed[cell.y] ? indexed[cell.y] : [];
    indexed[cell.y][cell.x] = true;
    return indexed;
  }, []);
};

export const selectActiveCellsIndexed = createSelector(
  selectGameField,
  (gameField: IGameFieldState): boolean[][] => {
    return getIndexedActiveCells(gameField.activeCells);
  }
);

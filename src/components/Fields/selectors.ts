import { RootState } from "@/store/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { IFieldControlState } from "@/components/Fields/slice";

const selectFieldControl = (state: RootState) => {
  return state.fieldControl;
};

export const selectCellsInRow = createSelector(
  selectFieldControl,
  (fieldControl: IFieldControlState) => {
    return Math.floor(fieldControl.maxFieldWidth / fieldControl.cellSize);
  }
);

export const selectCellsInCol = createSelector(
  selectFieldControl,
  (fieldControl: IFieldControlState) => {
    return Math.floor(fieldControl.maxFieldHeight / fieldControl.cellSize);
  }
);

import { RootState } from "@/store/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectFigurePalette = (state: RootState) => {
  return state.figurePalette;
};

export const selectFigures = createSelector(
  selectFigurePalette,
  (figurePalette) => {
    return figurePalette.figures;
  }
);

export const selectPaletteActive = createSelector(
  selectFigurePalette,
  (figurePalette) => {
    return figurePalette.figurePaletteActive;
  }
);

export const selectPaletteCurrent = createSelector(
  selectFigurePalette,
  (figurePalette) => {
    return figurePalette.currentFigureIndex;
  }
);

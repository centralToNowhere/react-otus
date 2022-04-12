import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellFigure } from "@/components/FigurePalette/FigurePaletteContainer";

export interface IFigurePaletteState {
  figures: CellFigure[];
}

export const initialState: IFigurePaletteState = {
  figures: [
    {
      name: "Figure X",
      indexedCells: [
        1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
        1,
      ],
      cellsInRow: 5,
      cellsInCol: 5,
    },
    {
      name: "Another figure",
      indexedCells: [1, 0, 1, 0, 1, 1, 0, 0, 0],
      cellsInRow: 3,
      cellsInCol: 3,
    },
  ],
};

export const figurePaletteSlice = createSlice({
  name: "figurePalette",
  initialState,
  reducers: {
    setFigures: (state, action: PayloadAction<CellFigure[]>) => {
      state.figures = action.payload;
    },
  },
});

export const { setFigures } = figurePaletteSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellFigure } from "@/components/FigurePalette/FigurePaletteContainer";

export interface IFigurePaletteState {
  figures: CellFigure[];
  figurePaletteActive: boolean;
  currentFigureIndex: number;
}

export const initialState: IFigurePaletteState = {
  figures: [
    {
      name: "Glider",
      indexedCells: [0, 1, 0, 0, 0, 1, 1, 1, 1],
      cellsInRow: 3,
      cellsInCol: 3,
    },
    {
      name: "Penta-decathlon",
      indexedCells: [
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0,
      ],
      cellsInRow: 10,
      cellsInCol: 3,
    },
    {
      name: "Gosper glider gun",
      indexedCells: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      cellsInRow: 36,
      cellsInCol: 9,
      cellSize: 10,
    },
  ],
  figurePaletteActive: false,
  currentFigureIndex: 0,
};

export const figurePaletteSlice = createSlice({
  name: "figurePalette",
  initialState,
  reducers: {
    setFigures: (state, action: PayloadAction<CellFigure[]>) => {
      state.figures = action.payload;
    },
    setFigurePaletteActive: (state, action: PayloadAction<boolean>) => {
      state.figurePaletteActive = action.payload;
    },
    setCurrentFigureIndex: (state, action: PayloadAction<number>) => {
      state.currentFigureIndex = action.payload;
    },
  },
});

export const { setFigures, setFigurePaletteActive, setCurrentFigureIndex } =
  figurePaletteSlice.actions;

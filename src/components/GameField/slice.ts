import { ICell } from "@/components/Cell";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialCells } from "@/utils/CellGenerator";
import { fieldHeight, fieldWidth } from "@/utils";
import { initialState as FieldControlInitialState } from "@/components/Fields/slice";

export interface IGameFieldState {
  activeCells: ICell[];
}

const defaultState: IGameFieldState = {
  activeCells: [],
};

const initialState: IGameFieldState = {
  activeCells: getInitialCells(
    fieldWidth,
    fieldHeight,
    FieldControlInitialState.cellSize
  ),
};

export const gameFieldSlice = createSlice({
  name: "gameField",
  initialState,
  reducers: {
    setActiveCells: (state, action: PayloadAction<ICell[]>) => {
      state.activeCells = action.payload;
    },
    resetCells: (state) => {
      state = defaultState;
      return state;
    },
  },
});

export const { setActiveCells, resetCells } = gameFieldSlice.actions;

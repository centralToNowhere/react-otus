import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICell } from "@/components/Cell";
import { getInitialCells } from "@/utils/CellGenerator";
import { fieldWidth, fieldHeight } from "@/utils";
import { initialState as FieldControlInitialState } from "@/components/Fields/FieldControlRdx";

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

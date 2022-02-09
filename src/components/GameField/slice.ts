import { ICell } from "@/components/Cell";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialCells } from "@/utils/CellGenerator";
import { fieldHeight, fieldWidth } from "@/utils";
import { initialState as FieldControlInitialState } from "@/components/Fields/slice";
import { getDataFromStorage } from "@/storage";

export interface IGameFieldState {
  activeCells: ICell[];
  gameInProgress: boolean;
}

export const defaultGameFieldState: IGameFieldState = {
  activeCells: [],
  gameInProgress: false,
};

const storageData = getDataFromStorage();

const initialState: IGameFieldState = {
  activeCells: getInitialCells(
    storageData?.fieldControl?.maxFieldWidth || fieldWidth,
    storageData?.fieldControl?.maxFieldHeight || fieldHeight,
    FieldControlInitialState.cellSize
  ),
  gameInProgress: false,
};

export const gameFieldSlice = createSlice({
  name: "gameField",
  initialState,
  reducers: {
    setActiveCells: (state, action: PayloadAction<ICell[]>) => {
      state.activeCells = action.payload;
    },
    resetCells: (state) => {
      state = defaultGameFieldState;
      return state;
    },
    startGame: (state) => {
      state.gameInProgress = true;
    },
    stopGame: (state) => {
      state.gameInProgress = false;
    },
  },
});

export const { setActiveCells, resetCells, startGame, stopGame } =
  gameFieldSlice.actions;
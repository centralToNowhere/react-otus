import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fieldWidth, fieldHeight } from "@/utils";
import {getPlayerDataFromStorage} from "@/storage/Storage";

export interface IFieldControlState {
  cellSize: number;
  maxFieldWidth: number;
  maxFieldHeight: number;
  capacity: number;
  speed: number;
}

const defaultFieldControlState: IFieldControlState = {
  cellSize: 40,
  maxFieldWidth: fieldWidth,
  maxFieldHeight: fieldHeight,
  capacity: 50,
  speed: 2
}

const playerDataFromStorage = getPlayerDataFromStorage();

export const initialState: IFieldControlState = {
  cellSize: playerDataFromStorage?.cellSize || defaultFieldControlState.cellSize,
  maxFieldWidth: playerDataFromStorage?.maxFieldWidth || defaultFieldControlState.maxFieldWidth,
  maxFieldHeight: playerDataFromStorage?.maxFieldHeight || defaultFieldControlState.maxFieldHeight,
  capacity: playerDataFromStorage?.capacity || defaultFieldControlState.capacity,
  speed: playerDataFromStorage?.speed || defaultFieldControlState.speed
}

export const fieldControlSlice = createSlice({
  name: "fieldControl",
  initialState,
  reducers: {
    setCellSize: (state, action: PayloadAction<number>) => {
      state.cellSize = action.payload;
    },
    setMaxFieldWidth: (state, action: PayloadAction<number>) => {
      state.maxFieldWidth = action.payload;
    },
    setMaxFieldHeight: (state, action: PayloadAction<number>) => {
      state.maxFieldHeight = action.payload;
    },
    setCapacity: (state, action: PayloadAction<number>) => {
      state.capacity = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    resetFieldControls: (state) => {
      state = defaultFieldControlState;
      return state;
    }
  },
});

export const {
  setCellSize,
  setMaxFieldWidth,
  setMaxFieldHeight,
  setCapacity,
  setSpeed,
  resetFieldControls
} = fieldControlSlice.actions;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fieldWidth, fieldHeight } from "@/utils";
import {
  clearSettingsData,
  getDataFromStorage,
  persistFieldSettings
} from "@/storage";
import { takeEvery, takeLatest } from "redux-saga/effects";

export interface IFieldControlState {
  cellSize: number;
  maxFieldWidth: number;
  maxFieldHeight: number;
  capacity: number;
  speed: number;
}

export const defaultFieldControlState: IFieldControlState = {
  cellSize: 40,
  maxFieldWidth: fieldWidth,
  maxFieldHeight: fieldHeight,
  capacity: 50,
  speed: 2,
};

const storageData = getDataFromStorage()?.fieldControls;

export const initialState: IFieldControlState = {
  cellSize:
    storageData?.cellSize || defaultFieldControlState.cellSize,
  maxFieldWidth:
    storageData?.maxFieldWidth ||
    defaultFieldControlState.maxFieldWidth,
  maxFieldHeight:
    storageData?.maxFieldHeight ||
    defaultFieldControlState.maxFieldHeight,
  capacity:
    storageData?.capacity || defaultFieldControlState.capacity,
  speed: storageData?.speed || defaultFieldControlState.speed,
};

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
    },
  },
});

export const {
  setCellSize,
  setMaxFieldWidth,
  setMaxFieldHeight,
  setCapacity,
  setSpeed,
  resetFieldControls,
} = fieldControlSlice.actions;

export const fieldControlsSaga = function* () {
  yield takeLatest([
    setCellSize.type,
    setMaxFieldWidth.type,
    setMaxFieldHeight.type,
    setCapacity.type,
    setSpeed.type
  ], persistFieldSettings);
  yield takeEvery(resetFieldControls.type, clearSettingsData);
}

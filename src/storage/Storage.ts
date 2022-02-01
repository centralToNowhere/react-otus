import { RootState } from "@/store/redux/store";
import { PlayerStorageData } from "@/player/Player";
import { takeEvery, takeLatest, select } from "redux-saga/effects";
import { logout, loginSucceed, loginFailed } from "@/auth";
import {
  setCellSize,
  setMaxFieldWidth,
  setMaxFieldHeight,
  setCapacity,
  setSpeed,
  resetFieldControls
} from "@/components/Fields";
import { IFieldControlState } from "@/components/Fields";

export const storageKey = "playerData";

export interface StorageData {
  player?: PlayerStorageData,
  fieldControls?: IFieldControlState
}

export const getDataFromStorage = (): StorageData | null => {
  const data = localStorage.getItem(storageKey);

  return data ? JSON.parse(data) : null;
};

const setDataToStorage = (data: StorageData) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

const clearStorage = (prop: keyof StorageData) => {
  const data = getDataFromStorage();

  if (data && typeof data === "object" && data[prop]) {
    delete data[prop];
    setDataToStorage(data);
  }
}

export const clearPlayerData = () => {
  clearStorage("player");
}

export const clearSettingsData = () => {
  clearStorage("fieldControls");
}

const selectPlayerData = (state: RootState): PlayerStorageData => {
  return {
    ...state.auth.player
  }
}

const selectFieldSettings = (state: RootState): IFieldControlState => {
  return {
    ...state.fieldControl
  }
}

export const persistPlayer = function* () {
  const playerData: PlayerStorageData = yield select(selectPlayerData);
  setDataToStorage({
    ...getDataFromStorage(),
    player: playerData
  });
}

export const persistFieldSettings = function* () {
  const fieldSettings: IFieldControlState = yield select(selectFieldSettings);
  setDataToStorage({
    ...getDataFromStorage(),
    fieldControls: fieldSettings
  })
}

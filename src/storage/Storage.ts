import { RootState } from "@/store/redux/store";
import { PlayerStorageData } from "@/player/Player";
import { select } from "redux-saga/effects";
import { IFieldControlState } from "@/components/Fields";
import { call } from "redux-saga-test-plan/matchers";

export const storageKey = "playerData";

export interface StorageData {
  player?: PlayerStorageData;
  fieldControl?: IFieldControlState;
}

export const getDataFromStorage = (): StorageData | null => {
  const data = localStorage.getItem(storageKey);

  return data ? JSON.parse(data) : null;
};

export const setDataToStorage = (data: StorageData) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const clearStorage = (prop: keyof StorageData) => {
  const data = getDataFromStorage();

  if (data && typeof data === "object" && data[prop]) {
    delete data[prop];
    setDataToStorage(data);
  }
};

export function* clearPlayerData() {
  yield call(clearStorage, "player");
}

export function* clearSettingsData() {
  yield call(clearStorage, "fieldControl");
}

export const selectPlayerData = (state: RootState): PlayerStorageData => {
  return {
    ...state.auth.player,
  };
};

export const selectFieldSettings = (state: RootState): IFieldControlState => {
  return {
    ...state.fieldControl,
  };
};

export const persistPlayer = function* () {
  const playerData: PlayerStorageData = yield select(selectPlayerData);
  yield call(setDataToStorage, {
    ...getDataFromStorage(),
    player: playerData,
  });
};

export const persistFieldSettings = function* () {
  const fieldSettings: IFieldControlState = yield select(selectFieldSettings);
  yield call(setDataToStorage, {
    ...getDataFromStorage(),
    fieldControl: fieldSettings,
  });
};

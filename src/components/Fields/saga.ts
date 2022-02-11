import { takeEvery, takeLatest } from "redux-saga/effects";
import { clearSettingsData, persistFieldSettings } from "@/storage";
import {
  resetFieldControls,
  setCapacity,
  setCellSize,
  setMaxFieldHeight,
  setMaxFieldWidth,
  setSpeed,
} from "@/components/Fields/slice";

export const fieldControlSaga = function* () {
  yield takeLatest(
    [
      setCellSize.type,
      setMaxFieldWidth.type,
      setMaxFieldHeight.type,
      setCapacity.type,
      setSpeed.type,
    ],
    persistFieldSettings
  );
  yield takeEvery(resetFieldControls.type, clearSettingsData);
};

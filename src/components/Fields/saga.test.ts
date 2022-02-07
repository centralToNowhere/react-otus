import { fieldControlSaga } from "@/components/Fields/saga";
import { combineReducers } from "redux";

import {
  fieldControlSlice,
  IFieldControlState,
  resetFieldControls,
  setCapacity,
  setCellSize,
  setMaxFieldHeight,
  setMaxFieldWidth,
  setSpeed,
} from "@/components/Fields/slice";
import { setDataToStorage } from "@/storage";
import { expectSaga } from "redux-saga-test-plan";
import { clearStorage } from "@/storage/Storage";

const fieldSettings: IFieldControlState = {
  cellSize: 30,
  maxFieldWidth: 400,
  maxFieldHeight: 300,
  capacity: 30,
  speed: 4,
};

const getSaga = () => {
  return expectSaga(fieldControlSaga).withReducer(
    combineReducers({
      fieldControl: fieldControlSlice.reducer,
    }),
    {
      fieldControl: fieldSettings,
    }
  );
};

describe("fieldControlSaga", () => {
  describe("call persistFieldSettings on field change", () => {
    it("setCellSize", () => {
      return getSaga()
        .call(setDataToStorage, {
          fieldControl: {
            ...fieldSettings,
            cellSize: 1,
          },
        })
        .dispatch(setCellSize(1))
        .hasFinalState({
          fieldControl: {
            ...fieldSettings,
            cellSize: 1,
          },
        })
        .run();
    });

    it("setMaxFieldWidth", () => {
      return getSaga()
        .call(setDataToStorage, {
          fieldControl: {
            ...fieldSettings,
            maxFieldWidth: 1,
          },
        })
        .dispatch(setMaxFieldWidth(1))
        .hasFinalState({
          fieldControl: {
            ...fieldSettings,
            maxFieldWidth: 1,
          },
        })
        .run();
    });

    it("setMaxFieldHeight", () => {
      return getSaga()
        .call(setDataToStorage, {
          fieldControl: {
            ...fieldSettings,
            maxFieldHeight: 1,
          },
        })
        .dispatch(setMaxFieldHeight(1))
        .hasFinalState({
          fieldControl: {
            ...fieldSettings,
            maxFieldHeight: 1,
          },
        })
        .run();
    });

    it("setCapacity", () => {
      return getSaga()
        .call(setDataToStorage, {
          fieldControl: {
            ...fieldSettings,
            capacity: 1,
          },
        })
        .dispatch(setCapacity(1))
        .hasFinalState({
          fieldControl: {
            ...fieldSettings,
            capacity: 1,
          },
        })
        .run();
    });

    it("setSpeed", () => {
      return getSaga()
        .call(setDataToStorage, {
          fieldControl: {
            ...fieldSettings,
            speed: 1,
          },
        })
        .dispatch(setSpeed(1))
        .hasFinalState({
          fieldControl: {
            ...fieldSettings,
            speed: 1,
          },
        })
        .run();
    });
  });

  describe("call clearSettingsData on reset", () => {
    it("resetFieldControls", () => {
      return expectSaga(fieldControlSaga)
        .call(clearStorage, "fieldControl")
        .dispatch(resetFieldControls())
        .run();
    });
  });
});

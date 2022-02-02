import { configureStore, EnhancedStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { fork, select, takeEvery, takeLatest } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import {
  fieldControlSlice,
  fieldControlsSaga,
  IFieldControlState,
} from "@/components/Fields/FieldControlRdx";
import {
  setCellSize,
  setMaxFieldWidth,
  setMaxFieldHeight,
  setCapacity,
  setSpeed,
  resetFieldControls,
  defaultFieldControlState,
} from "@/components/Fields/FieldControlRdx";
import {
  clearSettingsData,
  getDataFromStorage,
  persistFieldSettings,
  selectFieldSettings,
} from "@/storage";

const propsActions = {
  cellSize: setCellSize,
  maxFieldWidth: setMaxFieldWidth,
  maxFieldHeight: setMaxFieldHeight,
  speed: setSpeed,
  capacity: setCapacity,
};

const sagaMiddleware = createSagaMiddleware();
const store: EnhancedStore = configureStore({
  reducer: {
    fieldControl: fieldControlSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(function* () {
  yield fork(fieldControlsSaga);
});

const dispatch: ThunkDispatch<IFieldControlState, unknown, AnyAction> =
  store.dispatch;

describe("Field controls redux tests", () => {
  Object.keys(propsActions).forEach((prop) => {
    const randomNumber = Math.random() * 90 + 10;

    it(`${prop}: should change state correctly`, () => {
      dispatch(propsActions[prop as keyof typeof propsActions](randomNumber));
      expect(store.getState().fieldControl[prop]).toBe(randomNumber);
    });

    it(`${prop}: should update localstorage`, () => {
      dispatch(propsActions[prop as keyof typeof propsActions](randomNumber));
      expect(
        getDataFromStorage()?.fieldControl?.[prop as keyof IFieldControlState]
      ).toBe(randomNumber);
    });
  });

  it("resetFieldControls: should reset state to defaults", () => {
    dispatch(resetFieldControls());

    Object.keys(propsActions).forEach((prop) => {
      expect(store.getState().fieldControl[prop]).toBe(
        defaultFieldControlState[prop as keyof IFieldControlState]
      );
    });
  });

  describe("saga tests", () => {
    it("should run fieldControlsSaga correctly", () => {
      const gen = fieldControlsSaga();

      expect(gen.next().value).toEqual(
        takeLatest(
          [
            setCellSize.type,
            setMaxFieldWidth.type,
            setMaxFieldHeight.type,
            setCapacity.type,
            setSpeed.type,
          ],
          persistFieldSettings
        )
      );

      expect(gen.next().value).toEqual(
        takeEvery(resetFieldControls.type, clearSettingsData)
      );
    });

    it("should run persistFieldSettings", () => {
      const expectedFieldControlsState: IFieldControlState = {
        cellSize: 25,
        maxFieldWidth: 300,
        maxFieldHeight: 400,
        speed: 4,
        capacity: 15,
      };

      const gen = persistFieldSettings();
      expect(gen.next().value).toEqual(select(selectFieldSettings));
      gen.next(expectedFieldControlsState);
      expect(getDataFromStorage()?.fieldControl).toEqual(
        expectedFieldControlsState
      );
    });
  });
});

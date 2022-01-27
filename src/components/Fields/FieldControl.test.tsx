import { configureStore, EnhancedStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { persistPlayerDataMiddleware } from "@/storage/Storage";
import {
  fieldControlSlice,
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

const propsActions = {
  cellSize: setCellSize,
  maxFieldWidth: setMaxFieldWidth,
  maxFieldHeight: setMaxFieldHeight,
  speed: setSpeed,
  capacity: setCapacity,
};

const store: EnhancedStore = configureStore({
  reducer: {
    fieldControl: fieldControlSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(persistPlayerDataMiddleware);
  },
});
const dispatch: ThunkDispatch<IFieldControlState, unknown, AnyAction> =
  store.dispatch;

describe("FieldControlSlice actions tests", () => {
  Object.keys(propsActions).forEach((prop) => {
    it(`${prop}: should change state correctly`, () => {
      const randomNumber = Math.random() * 90 + 10;

      dispatch(propsActions[prop as keyof typeof propsActions](randomNumber));
      expect(store.getState().fieldControl[prop]).toBe(randomNumber);
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
});

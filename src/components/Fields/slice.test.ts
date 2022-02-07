import {
  defaultFieldControlState,
  fieldControlSlice,
  IFieldControlState,
  resetFieldControls,
  setCapacity,
  setCellSize,
  setMaxFieldHeight,
  setMaxFieldWidth,
  setSpeed,
} from "@/components/Fields/slice";

const propsActions = {
  cellSize: setCellSize,
  maxFieldWidth: setMaxFieldWidth,
  maxFieldHeight: setMaxFieldHeight,
  speed: setSpeed,
  capacity: setCapacity,
};
const initialState = {
  cellSize: 1,
  maxFieldWidth: 2,
  maxFieldHeight: 3,
  speed: 4,
  capacity: 5,
};

describe("Field controls actions", () => {
  Object.keys(propsActions).forEach((prop) => {
    const randomNumber = Math.random() * 90 + 10;

    it(`${prop}: should change state correctly`, () => {
      const resultState = fieldControlSlice.reducer(
        initialState,
        propsActions[prop as keyof typeof propsActions](randomNumber)
      );
      expect(resultState[prop as keyof typeof propsActions]).toBe(randomNumber);
    });
  });

  it("resetFieldControls: should reset state to defaults", () => {
    const resultState = fieldControlSlice.reducer(
      initialState,
      resetFieldControls()
    );

    Object.keys(propsActions).forEach((prop) => {
      expect(resultState[prop as keyof IFieldControlState]).toBe(
        defaultFieldControlState[prop as keyof IFieldControlState]
      );
    });
  });
});

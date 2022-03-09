import {
  initialStateAll,
  initialStateAllForTests,
  rootSaga,
} from "@/store/redux/store";
import { authSaga, authSlice } from "@/auth";
import { fieldControlSaga, fieldControlSlice } from "@/components/Fields";
import { gameFieldSlice } from "@/components/GameField";
import { testSaga } from "redux-saga-test-plan";
import { gameSaga } from "@/screens/Game/saga";

describe("store tests", () => {
  it("rootSaga", () => {
    testSaga(rootSaga)
      .next()
      .fork(fieldControlSaga)
      .next()
      .fork(authSaga)
      .next()
      .fork(gameSaga)
      .finish();
  });

  it("initialStateAll", () => {
    expect(initialStateAll).toEqual({
      auth: authSlice.getInitialState(),
      fieldControl: fieldControlSlice.getInitialState(),
      gameField: gameFieldSlice.getInitialState(),
    });
  });

  it("initialStateAllForTests", () => {
    expect(initialStateAllForTests).toEqual({
      ...initialStateAll,
      fieldControl: {
        ...initialStateAll.fieldControl,
        cellSize: 40,
        speed: 2,
      },
    });
  });
});

import { testSaga, expectSaga } from "redux-saga-test-plan";
import { gameSaga, gameCycle, setRandom } from "@/screens/Game/saga";
import {
  gameFieldSlice,
  generateRandom,
  startGame,
  stopGame,
  setActiveCells,
  resetCells,
} from "@/components/GameField";
import { selectGameField } from "@/components/GameField/selectors";
import { createMockTask } from "@redux-saga/testing-utils";
import { fieldControlSlice } from "@/components/Fields";
import * as matchers from "redux-saga-test-plan/matchers";
import { combineReducers } from "redux";
import { getNextGeneration, getRandomCells } from "@/utils/CellGenerator";

describe("Game saga tests", () => {
  it("gameSaga - gameCycle unit", () => {
    const saga = testSaga(gameSaga);
    const mockTask = createMockTask();

    // start if not in progress
    saga
      .next()
      .takeEvery(generateRandom.type, setRandom)
      .next()
      .select(selectGameField)
      .save("gameStatus")
      .next({
        gameInProgress: false,
        activeCells: [],
      })
      .take(startGame.type)
      .next()
      .fork(gameCycle)
      .next(mockTask)

      // stop if in progress
      .restore("gameStatus")
      .next({
        gameInProgress: true,
        activeCells: [],
      })
      .take([stopGame.type, resetCells.type])
      .next()

      // cancel task on resetCells
      .restore("gameStatus")
      .next({
        gameInProgress: false,
        activeCells: [],
      })
      .take(startGame.type)
      .next()
      .fork(gameCycle)
      .next(mockTask)
      .select(selectGameField)
      .next({
        gameInProgress: true,
        activeCells: [],
      })
      .take([stopGame.type, resetCells.type])
      .next()
      .cancel(mockTask)
      .next()

      // cancel task on stop
      .restore("gameStatus")
      .next({
        gameInProgress: false,
        activeCells: [],
      })
      .take(startGame.type)
      .next()
      .fork(gameCycle)
      .next(mockTask)
      .select(selectGameField)
      .next({
        gameInProgress: true,
        activeCells: [],
      })
      .take([stopGame.type, resetCells.type])
      .next()
      .cancel(mockTask)
      .next();
  });

  it("gameSaga - gameCycle integration", () => {
    const newGeneration = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
    ];
    return expectSaga(gameSaga)
      .withReducer(
        combineReducers({
          fieldControl: fieldControlSlice.reducer,
          gameField: gameFieldSlice.reducer,
        }),
        {
          fieldControl: {
            cellSize: 40,
            maxFieldWidth: 80,
            maxFieldHeight: 80,
            capacity: 50,
            speed: 2,
          },
          gameField: {
            activeCells: [],
            gameInProgress: false,
          },
        }
      )
      .provide([[matchers.call.fn(getNextGeneration), newGeneration]])
      .put(setActiveCells(newGeneration))
      .dispatch(startGame())
      .dispatch(stopGame())
      .hasFinalState({
        fieldControl: {
          cellSize: 40,
          maxFieldWidth: 80,
          maxFieldHeight: 80,
          capacity: 50,
          speed: 2,
        },
        gameField: {
          activeCells: [...newGeneration],
          gameInProgress: false,
        },
      })
      .run();
  });

  it("gameSaga - generate random cells", () => {
    const randomCells = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
    ];

    return expectSaga(gameSaga)
      .withReducer(
        combineReducers({
          fieldControl: fieldControlSlice.reducer,
          gameField: gameFieldSlice.reducer,
        }),
        {
          fieldControl: {
            cellSize: 40,
            maxFieldWidth: 80,
            maxFieldHeight: 80,
            capacity: 50,
            speed: 2,
          },
          gameField: {
            activeCells: [],
            gameInProgress: false,
          },
        }
      )
      .provide([[matchers.call.fn(getRandomCells), randomCells]])
      .put(setActiveCells(randomCells))
      .dispatch(generateRandom())
      .hasFinalState({
        fieldControl: {
          cellSize: 40,
          maxFieldWidth: 80,
          maxFieldHeight: 80,
          capacity: 50,
          speed: 2,
        },
        gameField: {
          activeCells: randomCells,
          gameInProgress: false,
        },
      })
      .run();
  });
});

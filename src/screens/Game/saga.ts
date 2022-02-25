import {
  takeEvery,
  call,
  cancel,
  take,
  select,
  fork,
  delay,
  put,
  CallEffect,
  SelectEffect,
} from "redux-saga/effects";
import { Task } from "redux-saga";
import {
  IGameFieldState,
  selectIndexedCells,
  startGame,
  stopGame,
  setActiveCells,
  generateRandom,
} from "@/components/GameField";
import { selectGameField } from "@/components/GameField/selectors";
import {
  selectCellsInCol,
  selectCellsInRow,
  selectGameCycleDelay,
} from "@/components/Fields";
import { getNextGeneration, getRandomCells } from "@/utils/CellGenerator";
import { RootState } from "@/store/redux/store";
import { ICell } from "@/Cell/Cell";

export const setNewGeneration = function* () {
  const cellsInRow: number = yield select(selectCellsInRow);
  const cellsInCol: number = yield select(selectCellsInCol);
  const indexedCells: Array<1 | 0> = yield select(selectIndexedCells);

  const newGeneration: ICell[] = yield call(
    getNextGeneration,
    cellsInRow,
    cellsInCol,
    indexedCells
  );
  yield put(setActiveCells(newGeneration));
};

export const setRandom = function* () {
  const cellsInRow: number = yield select(selectCellsInRow);
  const cellsInCol: number = yield select(selectCellsInCol);
  const capacity: number = yield select(
    (state: RootState) => state.fieldControl.capacity
  );

  const cells: ICell[] = yield call(
    getRandomCells,
    cellsInRow,
    cellsInCol,
    capacity / 100
  );
  yield put(setActiveCells(cells));
};

export const gameCycle = function* (): Generator<
  SelectEffect | CallEffect,
  void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  const gameCycleDelay: number = yield select(selectGameCycleDelay);

  yield call(setNewGeneration);
  yield delay(gameCycleDelay);

  yield call(gameCycle);
};

export const gameSaga = function* () {
  let gameCycleTask: Task | null = null;
  yield takeEvery(generateRandom.type, setRandom);

  while (true) {
    const gameFieldState: IGameFieldState = yield select(selectGameField);

    if (!gameFieldState.gameInProgress) {
      yield take(startGame.type);
      gameCycleTask = yield fork(gameCycle);
    } else {
      yield take(stopGame.type);

      if (gameCycleTask) {
        yield cancel(gameCycleTask);
      }
    }
  }
};

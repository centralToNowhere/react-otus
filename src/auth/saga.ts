import { call, put, select, takeEvery } from "redux-saga/effects";
import { clearPlayerData, persistPlayer } from "@/storage";
import { IPlayer } from "@/player/Player";
import {
  login,
  loginFailed,
  loginSucceed,
  logout,
  PlayerNotRegisteredError,
  registerPlayer,
  selectPlayerName,
} from "@/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onLogin = function* (): Generator<any, void, any> {
  const playerName: string = yield select(selectPlayerName);
  let player: IPlayer;

  try {
    player = yield call(registerPlayer, playerName);
  } catch (e) {
    yield put(loginFailed(e as Error));
    return;
  }

  if (player.registered) {
    yield put(loginSucceed(player));
  } else {
    yield put(loginFailed(PlayerNotRegisteredError));
  }
};

export const authSaga = function* () {
  yield takeEvery(loginSucceed.type, persistPlayer);
  yield takeEvery([logout.type, loginFailed.type], clearPlayerData);
  yield takeEvery(login.type, onLogin);
};

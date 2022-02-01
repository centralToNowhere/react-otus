import {
  createSelector,
  createSlice, PayloadAction,
} from "@reduxjs/toolkit";
import { defaultPlayer, IPlayer } from "@/player/Player";
import { RootState } from "@/store/redux/store";
import {
  persistPlayer,
  clearPlayerData,
  getDataFromStorage
} from "@/storage";
import { call, takeEvery, select, put } from "redux-saga/effects";

export interface IAuthState {
  player: IPlayer;
  loginPending: boolean;
}

const playerDataFromStorage = getDataFromStorage();

const initialState: IAuthState = {
  player: playerDataFromStorage?.player || defaultPlayer,
  loginPending: false,
};

export const registerPlayer = (playerName: string) => {
  return new Promise<IPlayer>((resolve) => {
    setTimeout(() => {
      if (playerName) {
        resolve({
          registered: true,
          name: playerName,
        });
      }
    }, 500);
  });
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
  },
  reducers: {
    logout: (state) => {
      state.player.registered = false;
      state.player.name = "";
    },
    login: (state, action: PayloadAction<string>) => {
      state.player.registered = false;
      state.loginPending = true;
      state.player.name = action.payload;
    },
    loginSucceed: (state, action: PayloadAction<IPlayer>) => {
      state.player.registered = action.payload.registered;
      state.loginPending = false;
      state.player.name = action.payload.name;
    },
    loginFailed: (state) => {
      state.player.registered = false;
      state.loginPending = false;
      state.player.name = "";
    }
  }
});

export const { logout, login, loginFailed, loginSucceed } = authSlice.actions;

const selectAuth = (state: RootState) => {
  return state.auth;
};

export const selectPlayer = createSelector(
  selectAuth,
  (auth: IAuthState) => auth.player
);

export const selectPlayerName = createSelector(
  selectPlayer,
  (player: IPlayer) => player.name
);

export const selectLoginPending = createSelector(
  selectAuth,
  (auth: IAuthState) => auth.loginPending
);

export const onLogin = function* () {
  const playerName: string = yield select(selectPlayerName);
  const player: IPlayer = yield call(registerPlayer, playerName);

  if (player.registered) {
    yield put(loginSucceed(player));
  } else {
    yield put(loginFailed());
  }
}

export const authSaga = function* () {
  yield takeEvery(loginSucceed.type, persistPlayer);
  yield takeEvery([
    logout.type,
    loginFailed.type
  ], clearPlayerData);
  yield takeEvery(login.type, onLogin);
}
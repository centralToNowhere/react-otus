import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultPlayer, IPlayer } from "@/player/Player";
import { RootState } from "@/store/redux/store";
import { persistPlayer, clearPlayerData, getDataFromStorage } from "@/storage";
import { call, takeEvery, select, put } from "redux-saga/effects";

export interface IAuthState {
  player: IPlayer;
  loginPending: boolean;
  loginError: string;
}

export type LoginError = {
  message: string;
};

export const PlayerNameNotSetError: LoginError = new Error(
  "Player name is not specified!"
);
export const PlayerNotRegisteredError: LoginError = new Error(
  "Player is not registered somehow!"
);

const playerDataFromStorage = getDataFromStorage();

const initialState: IAuthState = {
  player: playerDataFromStorage?.player || defaultPlayer,
  loginPending: false,
  loginError: "",
};

export const fakeRegisterPlayerTimeout = 500;

export const registerPlayer = (playerName: string) => {
  return new Promise<IPlayer>((resolve, reject) => {
    setTimeout(() => {
      if (playerName) {
        resolve({
          registered: true,
          name: playerName,
        });
      } else {
        reject(PlayerNameNotSetError);
      }
    }, fakeRegisterPlayerTimeout);
  });
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
  },
  reducers: {
    logout: (state) => {
      state.player.registered = false;
      state.player.name = "";
      state.loginError = "";
    },
    login: (state, action: PayloadAction<string>) => {
      state.player.registered = false;
      state.loginPending = true;
      state.player.name = action.payload;
      state.loginError = "";
    },
    loginSucceed: (state, action: PayloadAction<IPlayer>) => {
      state.player.registered = action.payload.registered;
      state.loginPending = false;
      state.player.name = action.payload.name;
      state.loginError = "";
    },
    loginFailed: (state, action: PayloadAction<LoginError>) => {
      state.player.registered = false;
      state.loginPending = false;
      state.player.name = "";
      state.loginError = action.payload.message;
    },
  },
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

export const selectLoginError = createSelector(
  selectAuth,
  (auth: IAuthState) => auth.loginError
);

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

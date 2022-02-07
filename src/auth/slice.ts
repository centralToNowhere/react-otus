import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultPlayer, IPlayer } from "@/player/Player";
import { getDataFromStorage } from "@/storage";
import { IAuthState, LoginError } from "@/auth";

const playerDataFromStorage = getDataFromStorage();

const initialState: IAuthState = {
  player: playerDataFromStorage?.player || defaultPlayer,
  loginPending: false,
  loginError: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
  },
  reducers: {
    logout: (state) => {
      state.player.registered = false;
      state.loginPending = false;
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

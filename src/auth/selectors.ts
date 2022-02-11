import { RootState } from "@/store/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { IPlayer } from "@/player/Player";
import { IAuthState } from "@/auth";

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

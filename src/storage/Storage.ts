import { Middleware } from "redux";
import { RootState } from "@/store/redux/store";
import { PlayerStorageData } from "@/player/Player";

export const storageKey = "playerData";

export const getPlayerDataFromStorage = (): PlayerStorageData | null => {
  const playerData = localStorage.getItem(storageKey);

  return playerData ? JSON.parse(playerData) : null;
};

export const setPlayerDataToStorage = (state: RootState) => {
  const playerStorageData: PlayerStorageData = {
    ...state.fieldControl,
    player: {
      ...state.auth?.player,
    },
  };

  localStorage.setItem(storageKey, JSON.stringify(playerStorageData));
};
export const persistPlayerDataMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    setPlayerDataToStorage(store.getState());
  };

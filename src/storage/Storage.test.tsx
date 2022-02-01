import {
  setDataToStorage,
  getDataFromStorage,
  storageKey,
  persistPlayerDataMiddleware,
} from "@/storage/Storage";
import { PlayerStorageData } from "@/player/Player";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { authSlice } from "@/auth";
import { gameFieldSlice } from "@/components/GameField";
import { fieldControlSlice } from "@/components/Fields";

describe("saving/loading state to localstorage", () => {
  const store: EnhancedStore = configureStore({
    reducer: {
      auth: authSlice.reducer,
      gameField: gameFieldSlice.reducer,
      fieldControl: fieldControlSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(persistPlayerDataMiddleware);
    },
    preloadedState: {
      auth: {
        player: {
          registered: true,
          name: "Player2",
        },
        loginPending: false,
      },
      fieldControl: {
        cellSize: 30,
        maxFieldWidth: 300,
        maxFieldHeight: 300,
        speed: 2,
        capacity: 30,
      },
      gameField: {
        activeCells: [
          {
            x: 2,
            y: 2,
          },
        ],
      },
    },
  });

  const playerDataExpected: PlayerStorageData = {
    cellSize: 30,
    maxFieldWidth: 300,
    maxFieldHeight: 300,
    speed: 2,
    capacity: 30,
    player: {
      registered: true,
      name: "Player2",
    },
  };

  it("should save player data to storage", () => {
    setDataToStorage(store.getState());

    expect(localStorage.getItem(storageKey)).toBe(
      JSON.stringify(playerDataExpected)
    );
  });

  it("should get player data from storage", () => {
    const playerData = getDataFromStorage();

    expect(playerData).toEqual(playerDataExpected);
  });
});

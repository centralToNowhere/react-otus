import React from "react";
import { Story, Meta } from "@storybook/react";
import { Game, IGameProps } from "@/screens/Game";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/auth";
import { gameFieldSlice } from "@/components/GameField";
import { fieldControlSlice } from "@/components/Fields";

export default {
  title: "Components/Game",
  component: Game,
} as Meta;

const initialState = {
  auth: {
    player: {
      name: "",
      registered: false,
    },
    loginPending: false,
    loginError: "",
  },
  fieldControl: {
    cellSize: 40,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 1,
  },
  gameField: {
    activeCells: [],
  },
};

const TemplateInitial: Story<IGameProps> = () => {
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      gameField: gameFieldSlice.reducer,
      fieldControl: fieldControlSlice.reducer,
    },
    preloadedState: initialState,
  });

  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

const TemplatePlayerRegistered: Story<IGameProps> = () => {
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      gameField: gameFieldSlice.reducer,
      fieldControl: fieldControlSlice.reducer,
    },
    preloadedState: {
      ...initialState,
      auth: {
        ...initialState.auth,
        player: {
          name: "Player1",
          registered: true,
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

export const GameDefault = TemplateInitial;
export const GameWithPlayerRegistered = TemplatePlayerRegistered;

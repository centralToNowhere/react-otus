import React from "react";
import { Story, Meta } from "@storybook/react";
import { Game, IGameProps } from "@/screens/Game";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { initialStateAll, RootReducer } from "@/store/redux/store";

export default {
  title: "Components/Game",
  component: Game,
} as Meta;

const initialState = {
  ...initialStateAll,
};

const TemplateInitial: Story<IGameProps> = () => {
  const store = configureStore({
    reducer: RootReducer,
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
    reducer: RootReducer,
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

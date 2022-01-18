import React, { useReducer } from "react";
import { Story, Meta } from "@storybook/react";
import {
  GameFieldContainer,
  GameFieldContainerProps,
} from "@/components/GameFieldContainer/GameFieldContainer";
import { AppReducer, initialState } from "@/state";

export default {
  title: "Components/GameFieldContainer",
  component: GameFieldContainer,
  args: {
    cellSize: 40,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 1,
    activeCells: []
  },
} as Meta;

const Template: Story<GameFieldContainerProps> = (args) => {
  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
    ...args,
  });

  return <GameFieldContainer {...state} dispatch={dispatch} />;
};

export const FieldContainerDefault = Template.bind({});

export const FieldContainerWithRegisteredPlayer = Template.bind({});

FieldContainerWithRegisteredPlayer.args = {
  player: {
    registered: true,
    name: "Sam",
  },
};

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Main as GameField, IGameFieldProps } from "./GameField";

export default {
  title: "Components/GameField",
  component: GameField,
  args: {
    cellSize: 40,
    cellsInRow: 35,
    cellsInCol: 7,
    activeCells: [],
  },
} as Meta;

const Template: Story<IGameFieldProps> = (args) => <GameField {...args} />;

export const FieldSmall = Template.bind({});

FieldSmall.args = {
  cellSize: 20,
  cellsInRow: 20,
  cellsInCol: 5,
  activeCells: [],
};

export const FieldMedium = Template.bind({});

FieldMedium.args = {
  cellSize: 35,
  cellsInRow: 30,
  cellsInCol: 10,
  activeCells: [],
};

export const FieldBig = Template.bind({});

FieldBig.args = {
  cellSize: 40,
  cellsInRow: 42,
  cellsInCol: 10,
  activeCells: [],
};

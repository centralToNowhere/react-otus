import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  GameFieldContainer,
  GameFieldContainerProps,
} from "@/components/GameFieldContainer/GameFieldContainer";

export default {
  title: "Components/GameFieldContainer",
  component: GameFieldContainer,
  args: {
    cellSize: 40,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 1,
  },
} as Meta;

const Template: Story<GameFieldContainerProps> = (args) => {
  return <GameFieldContainer {...args} />;
};

export const FieldContainerDefault = Template.bind({});

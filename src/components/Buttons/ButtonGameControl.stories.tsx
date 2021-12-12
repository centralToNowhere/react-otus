import React from "react";
import { Story, Meta } from "@storybook/react";
import { ButtonGameControl } from "./ButtonGameControl";
import { IButtonProps } from "@/components/Form";
import { l10n } from "@/l10n/ru";

export default {
  title: "Components/ButtonGameControl",
  component: ButtonGameControl,
  args: {
    type: "button",
    onClick: () => {
      // empty function
    },
    name: "game-control-button",
    content: "Button",
  },
} as Meta;

const Template: Story<IButtonProps> = (args: IButtonProps) => {
  return <ButtonGameControl {...args} />;
};

export const ButtonStart = Template.bind({});

ButtonStart.args = {
  type: "button",
  name: "startButton",
  onClick: () => {
    console.log("start");
  },
  content: l10n.buttonStart,
};

export const ButtonStop = Template.bind({});

ButtonStop.args = {
  type: "button",
  name: "stopButton",
  onClick: () => {
    console.log("stop");
  },
  content: l10n.buttonStop,
};

export const ButtonReset = Template.bind({});

ButtonReset.args = {
  type: "reset",
  name: "resetButton",
  onClick: () => {
    console.log("reset");
  },
  content: l10n.buttonReset,
};

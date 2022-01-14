import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  PlayerContainer,
  IPlayerContainerProps,
} from "@/components/PlayerContainer";

export default {
  title: "Components/PlayerContainer",
  component: PlayerContainer,
  args: {
    player: {
      registered: true,
      name: "Player1",
    },
    onPlayerUnregister: () => {
      //empty
    },
  },
} as Meta;

const Template: Story<IPlayerContainerProps> = (args) => {
  return <PlayerContainer {...args} />;
};

export const PlayerContainerDefault = Template.bind({});

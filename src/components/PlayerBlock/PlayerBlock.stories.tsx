import React from "react";
import { Story, Meta } from "@storybook/react";
import { PlayerBlock, IPlayerContainerProps } from "@/components/PlayerBlock";

export default {
  title: "Components/PlayerBlock",
  component: PlayerBlock,
  args: {
    playerName: "Player1",
    onPlayerUnregister: () => {
      //empty
    },
  },
} as Meta;

const Template: Story<IPlayerContainerProps> = (args) => {
  return <PlayerBlock {...args} />;
};

export const PlayerContainerDefault = Template.bind({});

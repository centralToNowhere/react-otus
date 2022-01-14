import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  PlayerRegistrationForm,
  IRegistrationFormProps,
} from "@/components/RegistrationScreen/PlayerRegistrationForm";

export default {
  title: "Components/RegistrationScreen/PlayerRegistrationForm",
  component: PlayerRegistrationForm,
  args: {
    player: {
      registered: true,
      name: "Player1",
    },
    onPlayerRegistration: () => {
      //empty
    },
  },
} as Meta;

const Template: Story<IRegistrationFormProps> = (args) => {
  return <PlayerRegistrationForm {...args} />;
};

export const PlayerRegistrationFormDefault = Template.bind({});

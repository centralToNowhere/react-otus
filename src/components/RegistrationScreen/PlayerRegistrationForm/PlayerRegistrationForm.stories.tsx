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
    loginPending: false,
    loginError: "",
    onPlayerRegistration: () => {
      //empty
    },
  },
} as Meta;

const Template: Story<IRegistrationFormProps> = (args) => {
  return <PlayerRegistrationForm {...args} />;
};

export const PlayerRegistrationFormDefault = Template;

export const PlayerRegistrationFormPending = Template.bind({});
PlayerRegistrationFormPending.args = {
  loginPending: true,
};

export const PlayerRegistrationFormError = Template.bind({});
PlayerRegistrationFormError.args = {
  loginError: "Player is not registered!",
};

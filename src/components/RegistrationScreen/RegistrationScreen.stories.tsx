import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  RegistrationScreen,
  IRegistrationScreenProps,
} from "@/components/RegistrationScreen";

export default {
  title: "Components/RegistrationScreen",
  component: RegistrationScreen,
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

const Template: Story<IRegistrationScreenProps> = (args) => {
  return <RegistrationScreen {...args} />;
};

export const RegistrationScreenDefault = Template.bind({});

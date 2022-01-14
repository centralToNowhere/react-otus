import React from "react";
import { Story, Meta } from "@storybook/react";
import { Form, FormProps } from "./Form";

export default {
  title: "Components/PlayerRegistrationForm",
  component: Form,
  args: {
    cellSize: 40,
    capacity: 48,
    speed: 1,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
  },
} as Meta;

const Template: Story<FormProps> = (args) => <Form {...args} />;

export const FormDefault = Template.bind({});

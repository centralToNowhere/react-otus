import React from "react";
import { Story, Meta } from "@storybook/react";
import { Form, IFormProps } from "@/components/Form";

export default {
  title: "Components/SettingsForm",
  component: Form,
  args: {
    cellSize: 40,
    capacity: 48,
    speed: 1,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
  },
} as Meta;

const Template: Story<IFormProps> = (args) => <Form {...args} />;

export const FormDefault = Template.bind({});

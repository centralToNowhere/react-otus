import React from "react";
import { Story, Meta } from "@storybook/react";
import { Form, IFormProps } from "./Form";

export default {
  title: "Components/Form",
  component: Form,
  args: {
    inputString: "123",
  },
} as Meta;

const Template: Story<IFormProps> = (args) => <Form {...args} />;

export const FormWithTextInput = Template.bind({});

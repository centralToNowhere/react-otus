import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldError, IFieldErrorProps } from "./FieldError";

export default {
  title: "Components/FieldError",
  component: FieldError,
  args: {
    show: true,
    msg: "something went wrong",
  },
} as Meta;

const Template: Story<IFieldErrorProps> = (args) => <FieldError {...args} />;

export const ShowError = Template.bind({});

ShowError.args = {
  show: true,
};

export const NoError = Template.bind({});

NoError.args = {
  show: false,
};

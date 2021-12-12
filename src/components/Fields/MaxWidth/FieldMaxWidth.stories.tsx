import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldMaxWidth } from "./FieldMaxWidth";
import { IFieldProps } from "@/components/Form";

export default {
  title: "Components/FieldMaxWidth",
  component: FieldMaxWidth,
  args: {
    value: "500",
    onChange: () => {
      // empty function
    },
    onBlur: () => {
      // empty function
    },
    error: {
      show: false,
      msg: "Expected non-negative number",
    },
  },
} as Meta;

const Template: Story<IFieldProps<"fieldWidth">> = (
  args: IFieldProps<"fieldWidth">
) => {
  return <FieldMaxWidth {...args} />;
};

export const MaxWidthInput = Template.bind({});

export const MaxWidthInputWithError = Template.bind({});

MaxWidthInputWithError.args = {
  error: {
    show: true,
    msg: "Expected non-negative number",
  },
};

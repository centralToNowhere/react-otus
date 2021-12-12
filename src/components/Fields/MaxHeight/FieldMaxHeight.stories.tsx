import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldMaxHeight } from "./FieldMaxHeight";
import { IFieldProps } from "@/components/Form";

export default {
  title: "Components/FieldMaxHeight",
  component: FieldMaxHeight,
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

const Template: Story<IFieldProps<"fieldHeight">> = (
  args: IFieldProps<"fieldHeight">
) => {
  return <FieldMaxHeight {...args} />;
};

export const MaxHeightInput = Template.bind({});

export const MaxHeightInputWithError = Template.bind({});

MaxHeightInputWithError.args = {
  error: {
    show: true,
    msg: "Expected non-negative number",
  },
};

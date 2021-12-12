import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldCapacity } from "./FieldCapacity";
import { IFieldProps } from "@/components/Form";

export default {
  title: "Components/FieldCapacity",
  component: FieldCapacity,
  args: {
    value: "50",
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

const Template: Story<IFieldProps<"capacity">> = (
  args: IFieldProps<"capacity">
) => {
  return <FieldCapacity {...args} />;
};

export const CapacityInput = Template.bind({});

export const MaxHeightWithError = Template.bind({});

MaxHeightWithError.args = {
  error: {
    show: true,
    msg: "Expected non-negative number",
  },
};

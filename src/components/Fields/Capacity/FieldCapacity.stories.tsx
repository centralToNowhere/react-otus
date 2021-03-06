import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldCapacity } from "./FieldCapacity";
import { IFieldProps } from "@/components/Form";
import { isValidNonNegativeNumericString } from "@/utils";

export default {
  title: "Components/FormFields/Capacity",
  component: FieldCapacity,
  args: {
    formRawData: {
      rawCapacity: "50",
    },
    onRawChange: () => {
      // empty function
    },
    onChange: () => {
      // empty function
    },
    formValidators: [isValidNonNegativeNumericString()],
    error: {
      show: false,
      msg: "capacity error",
    },
  },
} as Meta;

const Template: Story<
  IFieldProps<{
    rawCapacity: string;
  }>
> = (args) => {
  return <FieldCapacity {...args} />;
};

export const CapacityInput = Template.bind({});

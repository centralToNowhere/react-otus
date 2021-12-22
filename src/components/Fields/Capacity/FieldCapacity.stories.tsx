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
  },
} as Meta;

const Template: Story<IFieldProps> = (args: IFieldProps) => {
  return <FieldCapacity {...args} />;
};

export const CapacityInput = Template.bind({});

export const MaxHeightWithError = Template.bind({});

MaxHeightWithError.args = {
  value: "qwerty",
};

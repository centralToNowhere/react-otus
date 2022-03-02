import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldSpeed } from "@/components/Fields/Speed/FieldSpeed";
import { IFieldProps } from "@/components/Form";

export default {
  title: "Components/FieldSpeed",
  component: FieldSpeed,
  args: {
    formRawData: {
      rawSpeed: "2",
    },
    onRawChange: () => {
      // empty function
    },
    onChange: () => {
      // empty function
    },
  },
} as Meta;

const Template: Story<
  IFieldProps<{
    rawSpeed: string;
  }>
> = (args) => {
  return <FieldSpeed {...args} />;
};

export const SpeedInput = Template.bind({});

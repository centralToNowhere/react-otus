import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldSpeed } from "@/components/Fields/Speed/FieldSpeed";
import { IFieldProps } from "@/components/Form";

export default {
  title: "Components/FieldSpeed",
  component: FieldSpeed,
  args: {
    value: "2",
    onChange: () => {
      // empty function
    },
    onBlur: () => {
      // empty function
    },
    error: {
      show: false,
      msg: "Expected positive number",
    },
  },
} as Meta;

const Template: Story<IFieldProps<"speed">> = (args: IFieldProps<"speed">) => {
  return <FieldSpeed {...args} />;
};

export const SpeedInput = Template.bind({});

export const SpeedInputWithError = Template.bind({});

SpeedInputWithError.args = {
  error: {
    show: true,
    msg: "Expected positive number",
  },
};

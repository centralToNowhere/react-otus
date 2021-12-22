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
  },
} as Meta;

const Template: Story<IFieldProps> = (args: IFieldProps) => {
  return <FieldMaxHeight {...args} />;
};

export const MaxHeightInput = Template.bind({});

export const MaxHeightInputWithError = Template.bind({});

MaxHeightInputWithError.args = {
  value: "qwerty",
};

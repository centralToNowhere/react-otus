import React from "react";
import { Story, Meta } from "@storybook/react";
import { FieldCellSize } from "@/components/Fields/CellSize/FieldCellSize";
import { IFieldProps } from "@/components/Form";

export default {
  title: "Components/FieldCellSize",
  component: FieldCellSize,
  args: {
    value: "40",
    onChange: () => {
      // empty function
    },
    onBlur: () => {
      // empty function
    },
    error: {
      show: false,
      msg: "Expected number >= 10",
    },
  },
} as Meta;

const Template: Story<IFieldProps<"cellSize">> = (
  args: IFieldProps<"cellSize">
) => {
  return <FieldCellSize {...args} />;
};

export const CellSizeInput = Template.bind({});

export const CellSizeInputWithError = Template.bind({});

CellSizeInputWithError.args = {
  error: {
    show: true,
    msg: "Expected number >= 10",
  },
};
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
  },
} as Meta;

const Template: Story<IFieldProps> = (args: IFieldProps) => {
  return <FieldCellSize {...args} />;
};

export const CellSizeInput = Template.bind({});
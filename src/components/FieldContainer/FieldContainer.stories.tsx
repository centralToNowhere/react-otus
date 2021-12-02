import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  FieldContainer,
  FieldContainerProps,
} from "@/components/FieldContainer/FieldContainer";

export default {
  title: "Components/FieldContainer",
  component: FieldContainer,
  args: {
    cellSize: 40,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 1,
  },
} as Meta;

const Template: Story<FieldContainerProps> = (args) => {
  return <FieldContainer {...args} />;
};

export const FieldContainerDefault = Template.bind({});

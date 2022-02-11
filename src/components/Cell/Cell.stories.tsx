import React from "react";
import { Story, Meta } from "@storybook/react";
import { Cell, ICellProps } from "./Cell";

export default {
  title: "Components/Cell",
  component: Cell,
  args: {
    cssClassName: "cell",
    isActive: true,
    number: 1,
  },
} as Meta;

const Template: Story<ICellProps> = (args) => <Cell {...args} />;

export const CellActive = Template;

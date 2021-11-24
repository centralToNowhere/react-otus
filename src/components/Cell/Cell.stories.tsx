import React from "react";
import { Story, Meta } from "@storybook/react";
import { Cell, ICellProps } from "./Cell";

export default {
  title: "Components/Cell",
  component: Cell,
  args: {
    isActive: false,
    size: 30,
  },
} as Meta;

const Template: Story<ICellProps> = (args) => <Cell {...args} />;

export const CellActive = Template.bind({});

CellActive.args = {
  isActive: true,
};

export const CellInactive = Template.bind({});

CellInactive.args = {
  isActive: false,
};

export const CellSmall = Template.bind({});

CellSmall.args = {
  isActive: true,
  size: 10,
};

export const CellBig = Template.bind({});

CellBig.args = {
  isActive: true,
  size: 40,
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Cell from "../lesson3/components/Cell";

export default {
  component: Cell,
  title: "Components/Cell",
  args: {
    backgroundColor: "rgb(256,93,93)",
    width: 30,
    number: 1,
    onCellClick: () => {
      console.log("click");
    },
  },
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Dead = Template.bind({});
Dead.args = {
  alive: false,
};

export const Alive = Template.bind({});
Alive.args = {
  alive: true,
};

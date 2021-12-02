import React from "react";
import { Story, Meta } from "@storybook/react";
import { Field, IFieldProps } from "./Field";

export default {
  title: "Components/Field",
  component: Field,
  args: {
    cellSize: 40,
    cellsInRow: 35,
    cellsInCol: 7,
  },
} as Meta;

const Template: Story<IFieldProps> = (args) => <Field {...args} />;

export const FieldSmall = Template.bind({});

FieldSmall.args = {
  cellSize: 20,
  cellsInRow: 20,
  cellsInCol: 5,
};

export const FieldMedium = Template.bind({});

FieldMedium.args = {
  cellSize: 35,
  cellsInRow: 30,
  cellsInCol: 10,
};

export const FieldBig = Template.bind({});

FieldBig.args = {
  cellSize: 40,
  cellsInRow: 42,
  cellsInCol: 10,
};

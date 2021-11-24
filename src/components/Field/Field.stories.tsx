import React from "react";
import { Story, Meta } from "@storybook/react";
import { Field, IFieldProps } from "./Field";
import figures from "./figures.json";

export default {
  title: "Components/Field",
  component: Field,
  args: {
    cellSize: 40,
    cellsBetweenChars: 1,
    inputString: "123",
    figuresMap: figures["figures"],
    fieldWidthPx: 600,
    fieldHeightPX: 400,
  },
} as Meta;

const Template: Story<IFieldProps> = (args) => <Field {...args} />;

export const FieldSmall = Template.bind({});

FieldSmall.args = {
  cellSize: 20,
};

export const FieldBig = Template.bind({});

FieldBig.args = {
  cellSize: 10,
};

import React from "react";
import { Story, Meta } from "@storybook/react";
import { rest } from "msw";
import {
  FieldContainer,
  FieldContainerProps,
} from "@/components/FieldContainer/FieldContainer";
import figures from "@/components/Field/figures.json";

export default {
  title: "Components/FieldContainer",
  component: FieldContainer,
  args: {
    cellSize: 40,
    cellsBetweenChars: 1,
    fieldWidthPx: 600,
    fieldHeightPx: 400,
  },
  parameters: {
    msw: [
      rest.get("/figures.json", (req, res, ctx) => {
        return res(ctx.json(figures));
      }),
    ],
  },
} as Meta;

const Template: Story<FieldContainerProps> = (args) => {
  return <FieldContainer {...args} />;
};

export const FieldContainerSmall = Template.bind({});
FieldContainerSmall.args = {
  cellSize: 20,
  fieldWidthPx: 600,
  fieldHeightPx: 300,
};

export const FieldContainerBig = Template.bind({});
FieldContainerBig.args = {
  cellSize: 10,
  fieldWidthPx: 800,
  fieldHeightPx: 300,
};

import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  FigurePalette,
  FigurePaletteProps,
} from "@/components/FigurePalette/FigurePalette";

export default {
  title: "Components/FigurePalette",
  component: FigurePalette,
  args: {
    figures: [
      {
        name: "First figure",
        indexedCells: [
          1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
          0, 1,
        ],
        cellsInRow: 5,
        cellsInCol: 5,
      },
      {
        name: "Second figure",
        indexedCells: [1, 0, 1, 0, 1, 1, 0, 0, 0],
        cellsInRow: 3,
        cellsInCol: 3,
      },
      {
        name: "Third figure",
        indexedCells: [
          1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1,
          0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1,
          0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
          0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
          0, 0, 1, 1, 0, 0, 0, 1,
        ],
        cellsInRow: 10,
        cellsInCol: 10,
      },
    ],
  },
} as Meta;

const Template: Story<FigurePaletteProps> = (args) => (
  <FigurePalette {...args} />
);

export const PaletteDefault = Template;

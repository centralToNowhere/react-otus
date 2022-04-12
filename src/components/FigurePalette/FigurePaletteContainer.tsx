import React from "react";
import { IndexedCells } from "@/Cell/Cell";
import { useSelector } from "react-redux";
import { selectFigures } from "@/components/FigurePalette/selectors";
import { FigurePalette } from "@/components/FigurePalette/FigurePalette";

export interface CellFigure {
  name: string;
  indexedCells: IndexedCells;
  cellsInCol: number;
  cellsInRow: number;
}

export const FigurePaletteContainer = () => {
  const figures = useSelector(selectFigures);

  return <FigurePalette figures={figures} />;
};

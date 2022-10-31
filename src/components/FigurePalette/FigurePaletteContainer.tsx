import React from "react";
import { IndexedCells } from "@/Cell/Cell";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFigures,
  selectPaletteActive,
} from "@/components/FigurePalette/selectors";
import { FigurePalette } from "@/components/FigurePalette/FigurePalette";
import {
  setCurrentFigureIndex,
  setFigurePaletteActive,
} from "@/components/FigurePalette/slice";

export interface CellFigure {
  name: string;
  indexedCells: IndexedCells;
  cellsInCol: number;
  cellsInRow: number;
  cellSize?: number;
}

export const FigurePaletteContainer = () => {
  const dispatch = useDispatch();
  const figures = useSelector(selectFigures);
  const paletteActive = useSelector(selectPaletteActive);

  const onStartFigurePlacement = () => {
    dispatch(setFigurePaletteActive(true));
  };

  const onCancelFigurePlacement = () => {
    dispatch(setFigurePaletteActive(false));
  };

  const setCurrentFigure = (index: number) => {
    dispatch(setCurrentFigureIndex(index));
  };

  return (
    <FigurePalette
      figures={figures}
      paletteActive={paletteActive}
      onStartFigurePlacement={onStartFigurePlacement}
      onCancelFigurePlacement={onCancelFigurePlacement}
      setCurrentFigureIndex={setCurrentFigure}
    />
  );
};

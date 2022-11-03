import React from "react";
import { IndexedCells } from "@/Cell/Cell";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFigures,
  selectPaletteActive,
  selectPaletteCurrent,
} from "@/components/FigurePalette/selectors";
import { FigurePalette } from "@/components/FigurePalette/FigurePalette";
import {
  setCurrentFigureIndex,
  setFigurePaletteActive,
  setFigures,
} from "@/components/FigurePalette/slice";
import { rotateCellFigure } from "@/utils/RotateCellFigure";

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
  const currentFigureIndex = useSelector(selectPaletteCurrent);

  const onStartFigurePlacement = () => {
    dispatch(setFigurePaletteActive(true));
  };

  const onCancelFigurePlacement = () => {
    dispatch(setFigurePaletteActive(false));
  };

  const setCurrentFigure = (index: number) => {
    dispatch(setCurrentFigureIndex(index));
  };

  const onFigureRotate = () => {
    dispatch(
      setFigures(
        figures.map((figure, i) => {
          if (i === currentFigureIndex) {
            return rotateCellFigure(figure);
          }

          return figure;
        })
      )
    );
  };

  return (
    <FigurePalette
      figures={figures}
      paletteActive={paletteActive}
      onFigureRotate={onFigureRotate}
      onStartFigurePlacement={onStartFigurePlacement}
      onCancelFigurePlacement={onCancelFigurePlacement}
      setCurrentFigureIndex={setCurrentFigure}
    />
  );
};

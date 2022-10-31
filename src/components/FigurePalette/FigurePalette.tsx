import React, { FC, SVGAttributes, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { Main as NotConnectedGameField } from "@/components/GameField/GameField";
import { FormButton } from "@/components/Buttons";
import { CellFigure } from "@/components/FigurePalette";

export interface FigurePaletteProps {
  figures: CellFigure[];
  paletteActive: boolean;
  onStartFigurePlacement: () => void;
  onCancelFigurePlacement: () => void;
  setCurrentFigureIndex: (index: number) => void;
}

export const FigurePalette: FC<FigurePaletteProps> = ({
  figures,
  paletteActive,
  onStartFigurePlacement,
  onCancelFigurePlacement,
  setCurrentFigureIndex,
}) => {
  const [index, setIndex] = useState<number>(0);
  const currentFigure = figures[index];

  const onCurrentFigureChange = () => {
    const figure = figures[index];

    if (figure) {
      setCurrentFigureIndex(index);
    }
  };

  useEffect(() => {
    onCurrentFigureChange();
  }, [index]);

  return (
    <FigurePaletteContainer data-testid={"figurePalette"}>
      <FigureName>{currentFigure.name}</FigureName>
      <FigureSliderContainer>
        <FigureSliderArrow
          onClick={() => {
            setIndex((prev) => {
              return prev > 0 ? prev - 1 : prev;
            });
          }}
          viewBox="0 0 40 60"
          xmlns="http://www.w3.org/2000/svg"
          disabled={index === 0}
          role={"button"}
          aria-label={"prev"}
        >
          <path d="M40 0 L40 60 L0 30 Z" />
        </FigureSliderArrow>
        <PaletteGameField>
          <NotConnectedGameField
            cellSize={currentFigure.cellSize || 20}
            indexedCells={currentFigure.indexedCells}
            cellsInRow={currentFigure.cellsInRow}
            cellsInCol={currentFigure.cellsInCol}
            figurePaletteActive={false}
            paletteFigures={figures}
            currentFigureIndex={index}
            setActiveCell={() => {
              // empty
            }}
            setInactiveCell={() => {
              // empty
            }}
          />
        </PaletteGameField>
        <FigureSliderArrow
          onClick={() => {
            setIndex((prev) => {
              return prev !== figures.length - 1 ? prev + 1 : prev;
            });
          }}
          viewBox="0 0 40 60"
          xmlns="http://www.w3.org/2000/svg"
          disabled={index === figures.length - 1}
          role={"button"}
          aria-label={"next"}
        >
          <path d="M0 0 L40 30 L0 60 Z" />
        </FigureSliderArrow>
      </FigureSliderContainer>
      {paletteActive ? (
        <FormButton onClick={onCancelFigurePlacement}>Отмена</FormButton>
      ) : (
        <FormButton onClick={onStartFigurePlacement}>
          Установка фигуры
        </FormButton>
      )}
    </FigurePaletteContainer>
  );
};

export const FigureName = styled.p`
  margin-bottom: 1rem;
  text-align: center;
`;

export const PaletteGameField = styled.div`
  margin: 1rem 2rem;
`;

export const FigurePaletteContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  max-width: 600px;
`;

export const FigureSliderArrow = styled.svg<
  SVGAttributes<SVGElement> & {
    disabled: boolean;
  }
>`
  width: 1rem;
  cursor: pointer;

  & path {
    fill: ${({ disabled }) => (disabled ? COLORS.border : COLORS.accent)};
  }
`;

export const FigureSliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FigureSlider = styled.div`
  display: flex;
`;

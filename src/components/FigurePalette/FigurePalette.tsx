import React, { FC, SVGAttributes, useState } from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { Main as GameField } from "@/components/GameField/GameField";
import { FormButton } from "@/components/Buttons";
import { CellFigure } from "@/components/FigurePalette";

export interface FigurePaletteProps {
  figures: CellFigure[];
}

export const FigurePalette: FC<FigurePaletteProps> = ({ figures }) => {
  const [currentFigureIndex, setCurrentFigureIndex] = useState<number>(0);

  return (
    <FigurePaletteContainer data-testid={"figurePalette"}>
      <FigureName>{figures[currentFigureIndex].name}</FigureName>
      <FigureSliderContainer>
        <FigureSliderArrow
          onClick={() => {
            setCurrentFigureIndex((prev) => {
              return prev > 0 ? prev - 1 : prev;
            });
          }}
          viewBox="0 0 40 60"
          xmlns="http://www.w3.org/2000/svg"
          disabled={currentFigureIndex === 0}
          role={"button"}
          aria-label={"prev"}
        >
          <path d="M40 0 L40 60 L0 30 Z" />
        </FigureSliderArrow>
        <PaletteGameField>
          <GameField
            cellSize={20}
            indexedCells={figures[currentFigureIndex].indexedCells}
            cellsInRow={figures[currentFigureIndex].cellsInRow}
            cellsInCol={figures[currentFigureIndex].cellsInCol}
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
            setCurrentFigureIndex((prev) => {
              return prev !== figures.length - 1 ? prev + 1 : prev;
            });
          }}
          viewBox="0 0 40 60"
          xmlns="http://www.w3.org/2000/svg"
          disabled={currentFigureIndex === figures.length - 1}
          role={"button"}
          aria-label={"next"}
        >
          <path d="M0 0 L40 30 L0 60 Z" />
        </FigureSliderArrow>
      </FigureSliderContainer>
      <FormButton>Выбрать</FormButton>
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

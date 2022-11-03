import React, { FC, SVGAttributes, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";
import { Main as NotConnectedGameField } from "@/components/GameField/GameField";
import { FormButton } from "@/components/Buttons";
import { CellFigure } from "@/components/FigurePalette";

export interface FigurePaletteProps {
  figures: CellFigure[];
  paletteActive: boolean;
  onStartFigurePlacement: () => void;
  onFigureRotate: () => void;
  onCancelFigurePlacement: () => void;
  setCurrentFigureIndex: (index: number) => void;
}

const paletteActiveCancelText = "Отмена";
const paletteActiveText = "Установить шаблон";

export const FigurePalette: FC<FigurePaletteProps> = ({
  figures,
  paletteActive,
  onStartFigurePlacement,
  onFigureRotate,
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
      <PaletteFigureRotateButton onClick={onFigureRotate} aria-label={"rotate"}>
        <FigureRotateIcon
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"
          ></path>
        </FigureRotateIcon>
      </PaletteFigureRotateButton>
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
        <PaletteButton onClick={onCancelFigurePlacement}>
          {paletteActiveCancelText}
        </PaletteButton>
      ) : (
        <PaletteButton onClick={onStartFigurePlacement}>
          {paletteActiveText}
        </PaletteButton>
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
  overflow: scroll;

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    overflow: auto;
  }
`;

export const FigurePaletteContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

export const FigureSliderArrow = styled.svg<
  SVGAttributes<SVGElement> & {
    disabled: boolean;
  }
>`
  width: 1rem;
  cursor: pointer;
  flex-shrink: 0;

  & path {
    fill: ${({ disabled }) => (disabled ? COLORS.border : COLORS.accent)};
  }
`;

export const FigureRotateIcon = styled.svg`
  display: block;
  width: 20px;
  height: 20px;
  float: left;

  path {
    fill: ${COLORS.accent};
  }
`;

export const FigureSliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;

export const FigureSlider = styled.div`
  display: flex;
`;

export const PaletteButton = styled(FormButton)``;

export const PaletteFigureRotateButton = styled(PaletteButton)`
  &::after {
    content: "90°";
    display: block;
    float: left;
    font-size: 0.7rem;
  }
`;

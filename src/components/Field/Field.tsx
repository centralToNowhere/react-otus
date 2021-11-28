import React from "react";
import styled from "@emotion/styled";
import "./figures.json";
import { Cell, ICell } from "@/components/Cell";
import { PossibleInputCharacter } from "@/components/Form/Form";

interface IFigureInfo {
  dimensions: {
    width: number;
    height: number;
  };
  matrix: Array<Array<0 | 1>>;
}

export interface IFiguresMap {
  figures: Partial<Record<PossibleInputCharacter, IFigureInfo>>;
}

export interface IFieldProps {
  cellSize: number;
  cellsBetweenChars: number;
  inputString: string;
  figuresMap: IFiguresMap["figures"];
  fieldWidthPx: number;
  fieldHeightPX: number;
}

interface IFieldState {
  activeCells: ICell[];
  topLeftBottomRight: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
}

interface IFieldContainerProps {
  cellSize: number;
  getCellsAmountHor: () => number;
  getCellsAmountVert: () => number;
}

const isFigureInfo = (
  figuresInfo: IFigureInfo | undefined
): figuresInfo is IFigureInfo => {
  return !!(
    figuresInfo &&
    figuresInfo.dimensions !== null &&
    typeof figuresInfo.dimensions === "object" &&
    typeof figuresInfo.dimensions.width === "number" &&
    typeof figuresInfo.dimensions.height === "number" &&
    Array.isArray(figuresInfo.matrix) &&
    figuresInfo.matrix.every((arr: Array<0 | 1>) => Array.isArray(arr))
  );
};

export class Field extends React.Component<IFieldProps, IFieldState> {
  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      activeCells: [],
      topLeftBottomRight: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
    };

    this.getCellsInRow = this.getCellsInRow.bind(this);
    this.getCellsInCol = this.getCellsInCol.bind(this);
    this.isActiveCell = this.isActiveCell.bind(this);
    this.getDrawAreaTLBR = this.getDrawAreaTLBR.bind(this);
    this.updateActiveCells = this.updateActiveCells.bind(this);
  }

  getCellsInRow(): number {
    return Math.floor(this.props.fieldWidthPx / this.props.cellSize);
  }

  getCellsInCol(): number {
    return Math.floor(this.props.fieldHeightPX / this.props.cellSize);
  }

  isActiveCell(cell: ICell): boolean {
    return !!this.state.activeCells.find(
      (activeCell) => activeCell.x === cell.x && activeCell.y === cell.y
    );
  }

  getDrawAreaTLBR(
    cellsInCol: number,
    cellsInRow: number,
    inputString: string
  ): {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } {
    const { figuresWidth, figuresHeight } = inputString.split("").reduce(
      (
        acc,
        currentChar,
        charIndex
      ): {
        figuresWidth: number;
        figuresHeight: number;
      } => {
        const figuresInfo =
          this.props.figuresMap[currentChar as PossibleInputCharacter];

        if (isFigureInfo(figuresInfo)) {
          acc.figuresWidth =
            acc.figuresWidth +
            figuresInfo.dimensions.width +
            (charIndex !== 0 || charIndex !== inputString.length - 1
              ? this.props.cellsBetweenChars
              : 0);

          if (figuresInfo.dimensions.height > acc.figuresHeight) {
            acc.figuresHeight = figuresInfo.dimensions.height;
          }
        }

        return acc;
      },
      { figuresWidth: 0, figuresHeight: 0 }
    );

    const x1 = Math.round((cellsInRow - figuresWidth) / 2);
    const x2 = x1 + figuresWidth - 1;
    const y1 = Math.round((cellsInCol - figuresHeight) / 2);
    const y2 = y1 + figuresHeight - 1;

    return {
      x1,
      y1,
      x2,
      y2,
    };
  }

  /**
   * Возвращает массив всех задествованных в отображении строки ячеек в координатах поля
   * @param cellsInCol
   * @param cellsInRow
   * @param inputString
   * @returns ICell[]
   */
  calcActiveCells(
    cellsInCol: number,
    cellsInRow: number,
    inputString: string
  ): ICell[] {
    const { x1, y1, y2 } = this.getDrawAreaTLBR(
      cellsInCol,
      cellsInRow,
      inputString
    );
    let offsetX = 0;
    let offsetY = 0;
    let prevCharWidth = 0;

    return inputString
      .split("")
      .reduce((allCells: ICell[], currentChar, charIndex) => {
        const figuresInfo =
          this.props.figuresMap[currentChar as PossibleInputCharacter];

        if (isFigureInfo(figuresInfo)) {
          const figureWidth = figuresInfo.dimensions.width;
          const figureHeight = figuresInfo.dimensions.height;

          offsetX =
            offsetX +
            prevCharWidth +
            (charIndex !== 0 ? this.props.cellsBetweenChars : 0); // offset between chars
          offsetY = Math.round((y2 + 1 - y1 - figureHeight) / 2);
          prevCharWidth = figureWidth;

          allCells = allCells.concat(
            this.getFigureActiveCells(figuresInfo, offsetX, offsetY, y1, x1)
          );
        }

        return allCells;
      }, []);
  }

  /**
   * Вохвращает массив ячеек, образующих фигуру в координатах поля
   * @param figuresInfo
   * @param offsetX
   * @param offsetY
   * @param top
   * @param left
   * @returns ICell[]
   */
  getFigureActiveCells(
    figuresInfo: IFigureInfo,
    offsetX: number,
    offsetY: number,
    top: number,
    left: number
  ): ICell[] {
    return figuresInfo.matrix.reduce(
      (figureCells: ICell[], currentRow, rowIndex) => {
        figureCells = figureCells.concat(
          currentRow.reduce((rowCells: ICell[], currentCell, cellIndex) => {
            if (currentCell === 1) {
              rowCells.push({
                x: left + cellIndex + offsetX,
                y: top + rowIndex + offsetY,
              });
            }

            return rowCells;
          }, [])
        );

        return figureCells;
      },
      []
    );
  }

  updateActiveCells() {
    const activeCells = this.calcActiveCells(
      this.getCellsInCol(),
      this.getCellsInRow(),
      this.props.inputString
    );
    this.setState((prevState) => {
      return {
        ...prevState,
        activeCells: activeCells,
      };
    });
  }

  renderCells() {
    const cellsInCol = this.getCellsInCol();
    const cellsInRow = this.getCellsInRow();

    return Array.from(Array(cellsInCol)).map((col, i) =>
      Array.from(Array(cellsInRow)).map((row, j) => (
        <Cell
          key={(i + 1) * (j + 1)}
          size={this.props.cellSize}
          isActive={this.isActiveCell({ x: j, y: i })}
          number={(i + 1) * cellsInRow - (cellsInRow - (j + 1))}
        />
      ))
    );
  }

  onDocumentClick() {
    console.log("click!");
  }

  subscribeOnClicks() {
    document.body.addEventListener("click", this.onDocumentClick, false);
  }

  unsubscribeFromClicks() {
    document.body.removeEventListener("click", this.onDocumentClick);
  }

  componentDidMount() {
    this.subscribeOnClicks();
    this.updateActiveCells();
  }

  componentWillUnmount() {
    this.unsubscribeFromClicks();
  }

  componentDidUpdate(prevProps: Readonly<IFieldProps>) {
    if (this.props.inputString !== prevProps.inputString) {
      this.updateActiveCells();
    }
  }

  shouldComponentUpdate(nextProps: Readonly<IFieldProps>): boolean {
    if (nextProps.cellSize < 10) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <FieldContainer
        cellSize={this.props.cellSize}
        getCellsAmountHor={this.getCellsInRow}
        getCellsAmountVert={this.getCellsInCol}
        data-testid={"field"}
      >
        {this.renderCells()}
      </FieldContainer>
    );
  }
}

const FieldContainer = styled.div<IFieldContainerProps>`
  width: ${(props) => props.getCellsAmountHor() * props.cellSize}px;
  border-bottom: 1px solid black;
  cursor: pointer;
  height: ${(props) => props.getCellsAmountVert() * props.cellSize}px;
  display: flex;
  flex-wrap: wrap;
  background: #9083e6;
`;

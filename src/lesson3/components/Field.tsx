import React from "react";
import "./field.css";
import Cell, { ICell, isCell } from "./Cell";
import { setCellsAction, switchAliveOrDeadAction } from "../redux/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IState } from "../redux/store";

interface FieldProps {
  rowSize?: number;
  backgroundColor?: string;
  inputCells?: ICell[][];
}

interface FieldSizes {
  cellSize: number;
  fieldWidth: number;
}

export const getRandomColor = (): string => {
  const getRandNumber256 = (): number => {
    return parseInt(String(Math.random() * 256));
  };

  return ["r", "g", "b"].reduce((a, b, i) => {
    return `${a}${i < 2 ? `${getRandNumber256()},` : `${getRandNumber256()})`}`;
  }, "rgb(");
};

export const getRandomCellsByRowSize = (rowSize: number): ICell[][] => {
  const arr: ICell[][] = [];

  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < rowSize; j++) {
      const cell: ICell = {
        number: i * rowSize + j + 1,
        backgroundColor: getRandomColor(),
        alive: Boolean(Math.round(Math.random())),
      };

      if (!arr[i]) {
        arr[i] = [];
      }

      arr[i][j] = cell;
    }
  }

  return arr;
};

export const isValidCells = (cells: [][] | ICell[][]): boolean => {
  if (!Array.isArray(cells)) {
    return false;
  }

  const sideLength = cells.length;

  if (sideLength === 0) {
    return false;
  }

  for (let i = 0; i < sideLength; i++) {
    if (!Array.isArray(cells[i]) || cells[i].length !== sideLength) {
      return false;
    }

    for (let j = 0; j < sideLength; j++) {
      if (!isCell(cells[i][j])) {
        return false;
      }
    }
  }

  return true;
};

const calcFieldWidth = (
  cellSize: number,
  cellsNumberInRow: number,
  padding: number
): number => {
  return (cellSize + padding * 2) * cellsNumberInRow + padding * 2;
};

const calcCellSize = (
  padding: number,
  maxCellSize: number,
  cellsNumberInRow: number
): FieldSizes => {
  const cellPadding = padding;
  const outerPadding = padding;
  const outerMargin = 20;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const minSide = Math.min(screenWidth, screenHeight);
  const fieldWidth = calcFieldWidth(maxCellSize, cellsNumberInRow, padding);

  // overflow, need recalculate
  if (minSide < fieldWidth + 2 * outerMargin) {
    const cellSize =
      (minSide -
        2 * outerMargin -
        2 * outerPadding -
        (cellPadding * 2 + cellPadding * cellsNumberInRow * 2)) /
      cellsNumberInRow;

    return {
      cellSize: cellSize,
      fieldWidth: calcFieldWidth(cellSize, cellsNumberInRow, padding),
    };
  }

  return {
    // no overflow, good
    cellSize: maxCellSize,
    fieldWidth: fieldWidth,
  };
};

const Field = (props: FieldProps) => {
  const { rowSize = 10, backgroundColor, inputCells = [[]] } = props;
  const dispatch = useDispatch();

  const cells = isValidCells(inputCells)
    ? inputCells
    : getRandomCellsByRowSize(rowSize);
  const cellPadding = 5;
  const maxCellSize = 50;
  const { cellSize, fieldWidth } = calcCellSize(
    cellPadding,
    maxCellSize,
    rowSize
  );

  const fieldStyles = {
    backgroundColor,
    width: fieldWidth,
  };

  const listStyle = {
    padding: cellPadding,
  };

  dispatch(setCellsAction(cells));

  const renderCells = (): JSX.Element[] => {
    const cellNumbers: number[] = useSelector((state: IState) => {
      return state.cells.map((c: ICell) => {
        return c.number;
      });
    }, shallowEqual);

    return cellNumbers.map((number) => {
      return (
        <Cell
          key={number}
          number={number}
          width={cellSize}
          onCellClick={(n) => {
            dispatch(switchAliveOrDeadAction(n));
          }}
        />
      );
    });
  };

  return (
    <div className="container">
      <div className="field" data-testid="field" style={fieldStyles}>
        <div
          className="container-list"
          data-testid="list-cells"
          style={listStyle}
        >
          {renderCells()}
        </div>
      </div>
    </div>
  );
};

export default Field;

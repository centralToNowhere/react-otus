import React, { useEffect, useState } from "react";
import "./field.css";
import ListCells from "./ListCells";

export interface Cell {
  number: number;
  backgroundColor: string;
  alive: boolean;
}

function isCell(cell: Cell | unknown): cell is Cell {
  return (
    "backgroundColor" in (cell as Cell) &&
    "alive" in (cell as Cell) &&
    "number" in (cell as Cell)
  );
}

interface FieldProps {
  rowSize?: number;
  backgroundColor?: string;
  inputCells?: Cell[][];
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

export const getRandomCellsByRowSize = (rowSize: number): Cell[][] => {
  const arr: Cell[][] = [];

  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < rowSize; j++) {
      const cell: Cell = {
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

export const isValidCells = (cells: [][] | Cell[][]): boolean => {
  if (!Array.isArray(cells)) {
    return false;
  }

  cells = cells as []; // cells probably an array here
  const sideLength = cells.length;

  for (let i = 0; i < sideLength; i++) {
    if (!Array.isArray(cells[i]) || cells[i].length !== sideLength) {
      return false;
    }

    cells[i] = cells[i] as [];

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
  const cellsValid = isValidCells(inputCells);
  const randomCells = !cellsValid;

  const [cells, setCells] = useState(
    (cellsValid ? inputCells : null) || getRandomCellsByRowSize(rowSize)
  );
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

  useEffect(() => {
    if (randomCells) {
      setCells(getRandomCellsByRowSize(rowSize));
    }
  }, [rowSize]);

  useEffect(() => {
    if (isValidCells(inputCells)) {
      setCells(inputCells);
    }
  }, [inputCells]);

  const onCellClick = (number: number): void => {
    setCells((prevCells: Cell[][]) => {
      return prevCells.map((row) => {
        return row.map((cell) => {
          return {
            ...cell,
            alive: cell.number === number ? !cell.alive : cell.alive,
          };
        });
      });
    });
  };

  return (
    <div className="container">
      <div className="field" data-testid="field" style={fieldStyles}>
        <ListCells
          cells={cells}
          cellSize={cellSize}
          cellPadding={cellPadding}
          onCellClick={onCellClick}
        />
      </div>
    </div>
  );
};

export default Field;

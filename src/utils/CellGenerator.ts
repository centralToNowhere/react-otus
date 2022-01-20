import { ICell } from "@/components/Cell";

export const getCellsInRow = (rowWidth: number, cellSize: number): number => {
  return Math.floor(rowWidth / cellSize);
};

export const getCellsInCol = (colHeight: number, cellSize: number): number => {
  return Math.floor(colHeight / cellSize);
};

export const getRandomCells = (
  cellsInRow: number,
  cellsInCol: number,
  percentage: number
): ICell[] => {
  return getAllCells(cellsInCol, cellsInRow, (x: number, y: number) => {
    if (Math.random() < percentage) {
      return {
        x,
        y,
      };
    }

    return null;
  });
};

export const getInitialCells = (
  rowWidth: number,
  colHeight: number,
  cellSize: number
): ICell[] => {
  return getAllCells(
    getCellsInCol(colHeight, cellSize),
    getCellsInRow(rowWidth, cellSize),
    (x: number, y: number) => {
      if ((x - y) % 4 === 0 || (x + y) % 4 === 0) {
        return {
          x,
          y,
        };
      }

      return null;
    }
  );
};

const getAllCells = (
  cellsInCol: number,
  cellsInRow: number,
  getCellOrNull: (x: number, y: number) => ICell | null
) => {
  return Array.from(Array(cellsInCol)).reduce(
    (allCells, cell, rowNumber): ICell[] => {
      allCells = allCells.concat(
        getRowCells(cellsInRow, rowNumber, getCellOrNull)
      );

      return allCells;
    },
    []
  );
};

const getRowCells = (
  cellsInRow: number,
  rowNumber: number,
  getCellOrNull: (x: number, y: number) => ICell | null
) => {
  return Array.from(Array(cellsInRow)).reduce(
    (rowCells, cell, colNumber): ICell[] => {
      const newCell = getCellOrNull(colNumber, rowNumber);

      if (newCell !== null) {
        rowCells.push(newCell);
      }

      return rowCells;
    },
    []
  );
};

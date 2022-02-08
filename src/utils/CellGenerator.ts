import { ICell } from "@/components/Cell";

const willBeAlive = (
  x: number,
  y: number,
  activeCellsIndexed: boolean[][]
): boolean => {
  let neighbours = 0;
  const isCellStateAlive = activeCellsIndexed?.[y]?.[x];

  const entries = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];

  entries.forEach((entry) => {
    if (activeCellsIndexed?.[entry[1]]?.[entry[0]]) {
      neighbours++;
    }
  });

  if (isCellStateAlive) {
    if (neighbours === 2 || neighbours === 3) {
      return true;
    }
  } else {
    if (neighbours === 3) {
      return true;
    }
  }

  return false;
};

export const getNextGeneration = (
  cellsInRow: number,
  cellsInCol: number,
  activeCellsIndexed: boolean[][]
): ICell[] => {
  return getAllCells(cellsInCol, cellsInRow, (x: number, y: number) => {
    const alive = willBeAlive(x, y, activeCellsIndexed);

    return alive
      ? {
          x,
          y,
        }
      : null;
  });
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
    Math.floor(colHeight / cellSize),
    Math.floor(rowWidth / cellSize),
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

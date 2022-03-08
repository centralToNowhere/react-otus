import { ICell } from "@/Cell/Cell";

const willBeAlive = (isCellStateAlive: 1 | 0, neighbours: number): boolean => {
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
  indexedCells: Array<1 | 0>
): ICell[] => {
  return indexedCells.reduce((indexed: ICell[], cellState, i) => {
    if (
      willBeAlive(
        cellState,
        calculateNeighbours(cellState, indexedCells, i, cellsInRow)
      )
    ) {
      indexed.push({
        x: i % cellsInRow,
        y: Math.floor(i / cellsInRow),
      });
    }

    return indexed;
  }, []);
};

const calculateNeighbours = (
  cellState: 1 | 0,
  indexedCells: Array<1 | 0>,
  i: number,
  cellsInRow: number
) => {
  let neighbours = 0;

  // Некрасиво, но производительно

  // если ячейка находится на границе поля
  // right
  if ((i + 1) % cellsInRow !== 0) {
    neighbours += indexedCells[i + 1];
  }

  // left
  if (i % cellsInRow !== 0) {
    neighbours += indexedCells[i - 1];
  }

  // top
  if (i - cellsInRow >= 0) {
    neighbours += indexedCells[i - cellsInRow];

    // top right
    if ((i + 1) % cellsInRow !== 0) {
      neighbours += indexedCells[i + 1 - cellsInRow];
    }

    // top left
    if (i % cellsInRow !== 0) {
      neighbours += indexedCells[i - 1 - cellsInRow];
    }
  }

  // bottom
  if (i + cellsInRow < indexedCells.length) {
    neighbours += indexedCells[i + cellsInRow];

    // bottom right
    if ((i + 1) % cellsInRow !== 0) {
      neighbours += indexedCells[i + 1 + cellsInRow];
    }

    // bottom left
    if (i % cellsInRow !== 0) {
      neighbours += indexedCells[i - 1 + cellsInRow];
    }
  }
  // if (
  //   (i + 1) % cellsInRow === 0 ||
  //   i % cellsInRow === 0 ||
  //   i - cellsInRow < 0 ||
  //   i + cellsInRow >= indexedCells.length
  // ) {
  //
  //   }
  // } else {
  //   neighbours += indexedCells[i + 1];
  //   neighbours += indexedCells[i - 1];
  //   neighbours += indexedCells[i - cellsInRow];
  //   neighbours += indexedCells[i + 1 - cellsInRow];
  //   neighbours += indexedCells[i - 1 - cellsInRow];
  //   neighbours += indexedCells[i + cellsInRow];
  //   neighbours += indexedCells[i + 1 + cellsInRow];
  //   neighbours += indexedCells[i - 1 + cellsInRow];
  // }

  return neighbours;
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

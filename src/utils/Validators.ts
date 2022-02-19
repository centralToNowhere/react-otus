import { maxCellsAmount } from "@/Cell/Cell";

export const isValidNumericString = (
  inputString: unknown
): inputString is number => {
  return (
    typeof inputString === "string" &&
    inputString !== "" &&
    !isNaN(Number(inputString))
  );
};

export const isValidCellSizeString = (cellSizeString: unknown): boolean => {
  return (
    isValidNumericString(cellSizeString) &&
    Number(cellSizeString) % 1 === 0 &&
    Number(cellSizeString) > 0
  );
};

export const isValidCellsAmount = (
  cellSize: number,
  fieldMaxWidth: number,
  fieldMaxHeight: number
) => {
  const cellsAmount =
    Math.floor(fieldMaxWidth / cellSize) *
    Math.floor(fieldMaxHeight / cellSize);

  return cellsAmount <= maxCellsAmount;
};

export const isValidPositiveNumericString = (str: unknown): boolean => {
  return isValidNumericString(str) && Number(str) > 0;
};

export const isValidNonNegativeNumericString = (str: unknown): boolean => {
  return isValidNumericString(str) && Number(str) >= 0;
};

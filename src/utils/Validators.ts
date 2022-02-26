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

export const isValidCellSizeString = (
  cellSizeString: unknown
): string | true => {
  return (
    (isValidNumericString(cellSizeString) === true &&
      Number(cellSizeString) % 1 === 0 &&
      Number(cellSizeString) > 0) ||
    "Expected positive number."
  );
};

export const isValidCellsAmountMax = (
  cellSize: number,
  fieldMaxWidth: number,
  fieldMaxHeight: number
): string | true => {
  const cellsAmount =
    Math.floor(fieldMaxWidth / cellSize) *
    Math.floor(fieldMaxHeight / cellSize);

  return (
    cellsAmount <= maxCellsAmount ||
    `Maximum cells amount exceeded - ${maxCellsAmount}.`
  );
};

export const isAtLeastOneCellDisplayed = (
  cellSize: number,
  fieldMaxWidth: number,
  fieldMaxHeight: number
): string | true => {
  const cellsAmount =
    Math.floor(fieldMaxWidth / cellSize) *
    Math.floor(fieldMaxHeight / cellSize);

  return cellsAmount > 0 || "At least one cell should be displayed.";
};

export const isValidPositiveNumericString = (str: unknown): string | true => {
  return (
    (isValidNumericString(str) && Number(str) > 0) ||
    "Expected positive number."
  );
};

export const isValidNonNegativeNumericString = (
  str: unknown
): string | true => {
  return (
    (isValidNumericString(str) && Number(str) >= 0) ||
    "Expected non-negative number."
  );
};

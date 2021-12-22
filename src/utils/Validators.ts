import { minCellSize } from "@/components/Cell";

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
    Number(cellSizeString) >= minCellSize
  );
};

export const isValidPositiveNumericString = (str: unknown): boolean => {
  return isValidNumericString(str) && Number(str) > 0;
};

export const isValidNonNegativeNumericString = (str: unknown): boolean => {
  return isValidNumericString(str) && Number(str) >= 0;
};

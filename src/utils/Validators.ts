import { maxCellsAmount } from "@/Cell/Cell";
import { l10n } from "@/l10n/ru";
import { FieldValidator, OnValidateCallback } from "@/components/Fields";
import { FieldValidatorNumeric } from "@/components/Fields/FieldHandlers";

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
  callback?: OnValidateCallback
): FieldValidator => ({
  validate: (cellSizeString) => {
    return (
      isValidPositiveNumericString().validate(cellSizeString) &&
      Number(cellSizeString) % 1 === 0
    );
  },
  errorMessage: l10n.positiveNumber,
  onValidate: (isValid, errorMessage) =>
    callback ? callback(isValid, errorMessage) : null,
});

export const isValidCellsAmountMax = (
  callback?: OnValidateCallback
): FieldValidatorNumeric => ({
  validate: (
    cellSize: number,
    fieldMaxWidth: number,
    fieldMaxHeight: number
  ) => {
    return (
      Math.floor(fieldMaxWidth / cellSize) *
        Math.floor(fieldMaxHeight / cellSize) <=
      maxCellsAmount
    );
  },
  errorMessage: `${l10n.maxCellsAmount} (${maxCellsAmount}).`,
  onValidate: (isValid, errorMessage) =>
    callback ? callback(isValid, errorMessage) : null,
});

export const isAtLeastOneCellDisplayed = (
  callback?: OnValidateCallback
): FieldValidatorNumeric => ({
  validate: (
    cellSize: number,
    fieldMaxWidth: number,
    fieldMaxHeight: number
  ) => {
    return (
      Math.floor(fieldMaxWidth / cellSize) *
        Math.floor(fieldMaxHeight / cellSize) >
      0
    );
  },
  errorMessage: l10n.minCellsAmount,
  onValidate: (isValid, errorMessage) =>
    callback ? callback(isValid, errorMessage) : null,
});

export const isValidPositiveNumericString = (
  callback?: OnValidateCallback
): FieldValidator => ({
  validate: (value: string) => {
    return isValidNumericString(value) && Number(value) > 0;
  },
  errorMessage: l10n.positiveNumber,
  onValidate: (isValid, errorMessage) =>
    callback ? callback(isValid, errorMessage) : null,
});

export const isValidNonNegativeNumericString = (
  callback?: OnValidateCallback
): FieldValidator => ({
  validate: (value: string) => {
    return isValidNumericString(value) && Number(value) >= 0;
  },
  errorMessage: l10n.nonNegativeNumber,
  onValidate: (isValid, errorMessage) =>
    callback ? callback(isValid, errorMessage) : null,
});

export const cellsAmountCombinedValidator = (
  callback?: OnValidateCallback
): FieldValidator => ({
  validate: (cellSize: string, maxWidth: string, maxHeight: string) => {
    return (
      isValidPositiveNumericString().validate(maxWidth) &&
      isValidPositiveNumericString().validate(maxHeight) &&
      isValidCellSizeString().validate(cellSize) &&
      isValidCellsAmountMax().validate(
        Number(cellSize),
        Number(maxWidth),
        Number(maxHeight)
      ) &&
      isAtLeastOneCellDisplayed().validate(
        Number(cellSize),
        Number(maxWidth),
        Number(maxHeight)
      )
    );
  },
  errorMessage: l10n.fieldConfigurationError,
  onValidate: (isValid, errorMessage) =>
    callback ? callback(isValid, errorMessage) : null,
});

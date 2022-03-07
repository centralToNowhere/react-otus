import {
  isValidNumericString,
  isValidCellSizeString,
  isValidPositiveNumericString,
  isValidCellsAmountMax,
  isAtLeastOneCellDisplayed,
  cellsAmountCombinedValidator,
  isValidNonNegativeNumericString,
} from "@/utils/Validators";
import { maxCellsAmount } from "@/Cell/Cell";
import { l10n } from "@/l10n/ru";

describe("Validators tests", () => {
  it("isValidNumericString should return valid results", () => {
    expect(isValidNumericString("1.5")).toBe(true);
    expect(isValidNumericString("1,5")).toBe(false);
    expect(isValidNumericString("q23")).toBe(false);
    expect(isValidNumericString("")).toBe(false);
    expect(isValidNumericString("4")).toBe(true);
  });

  it("isValidCellSizeString", () => {
    expect(isValidCellSizeString().validate("123")).toBe(true);
    expect(isValidCellSizeString().validate("fwe32")).toBe(false);
    expect(isValidCellSizeString().validate("12.32")).toBe(false);
    expect(isValidCellSizeString().validate("0")).toBe(false);
    expect(isValidCellSizeString().validate("-1")).toBe(false);
    expect(isValidCellSizeString().errorMessage).toBe(l10n.positiveNumber);
    expect(isValidCellSizeString(() => true).onValidate(true, "")).toBe(true);
    expect(isValidCellSizeString().onValidate(true, "")).toBe(null);
  });

  it("isValidPositiveNumericString", () => {
    expect(isValidPositiveNumericString().validate("1")).toBe(true);
    expect(isValidPositiveNumericString().validate("0")).toBe(false);
    expect(isValidPositiveNumericString().validate("-1")).toBe(false);
    expect(isValidPositiveNumericString().errorMessage).toBe(
      l10n.positiveNumber
    );
    expect(isValidPositiveNumericString(() => false).onValidate(true, "")).toBe(
      false
    );
    expect(isValidPositiveNumericString().onValidate(true, "")).toBe(null);
  });

  it("isValidNonNegativeNumericString", () => {
    expect(isValidNonNegativeNumericString().validate("1")).toBe(true);
    expect(isValidNonNegativeNumericString().validate("0")).toBe(true);
    expect(isValidNonNegativeNumericString().validate("-1")).toBe(false);
    expect(isValidNonNegativeNumericString().errorMessage).toBe(
      l10n.nonNegativeNumber
    );
    expect(
      isValidNonNegativeNumericString(() => false).onValidate(true, "")
    ).toBe(false);
    expect(isValidNonNegativeNumericString().onValidate(true, "")).toBe(null);
  });

  it("isValidCellsAmount", () => {
    expect(isValidCellsAmountMax().validate(40, 100, 100)).toBe(true);
    expect(isValidCellsAmountMax().validate(1, 1000, 1000)).toBe(false);
    expect(isValidCellsAmountMax().errorMessage).toBe(
      `${l10n.maxCellsAmount} (${maxCellsAmount}).`
    );
    expect(isValidCellsAmountMax(() => true).onValidate(true, "")).toBe(true);
    expect(isValidCellsAmountMax().onValidate(true, "")).toBe(null);
  });

  it("isAtLeastOneCellDisplayed", () => {
    expect(isAtLeastOneCellDisplayed().validate(100, 100, 100)).toBe(true);
    expect(isAtLeastOneCellDisplayed().validate(40, 39, 100)).toBe(false);
    expect(isAtLeastOneCellDisplayed().validate(20, 200, 19)).toBe(false);
    expect(isAtLeastOneCellDisplayed().errorMessage).toBe(l10n.minCellsAmount);
    expect(isAtLeastOneCellDisplayed(() => 3).onValidate(true, "")).toBe(3);
    expect(isAtLeastOneCellDisplayed().onValidate(true, "")).toBe(null);
  });

  it("cellsAmountCombinedValidator", () => {
    expect(cellsAmountCombinedValidator().validate("10", "100", "100")).toBe(
      true
    );
    expect(cellsAmountCombinedValidator().validate("1", "100", "100")).toBe(
      true
    );
    expect(cellsAmountCombinedValidator().validate("1", "10.4", "10.5")).toBe(
      true
    );
    expect(cellsAmountCombinedValidator().validate("1.6", "10", "10")).toBe(
      false
    );
    expect(cellsAmountCombinedValidator().validate("100", "1", "100")).toBe(
      false
    );
    expect(cellsAmountCombinedValidator().validate("100", "100", "1")).toBe(
      false
    );
    expect(cellsAmountCombinedValidator().validate("1", "1000", "1000")).toBe(
      false
    );
    expect(cellsAmountCombinedValidator().validate("-10", "100", "100")).toBe(
      false
    );
    expect(cellsAmountCombinedValidator().validate("10", "0", "100")).toBe(
      false
    );
    expect(cellsAmountCombinedValidator().validate("10", "100", "0")).toBe(
      false
    );
    expect(cellsAmountCombinedValidator().errorMessage).toBe(
      l10n.fieldConfigurationError
    );
    expect(cellsAmountCombinedValidator(() => "str").onValidate(true, "")).toBe(
      "str"
    );
    expect(cellsAmountCombinedValidator().onValidate(true, "")).toBe(null);
  });
});

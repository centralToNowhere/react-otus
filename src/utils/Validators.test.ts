import {
  isValidNumericString,
  isValidCellSizeString,
  isValidNonNegativeNumericString,
  isValidPositiveNumericString,
  isValidCellsAmountMax,
  isAtLeastOneCellDisplayed,
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
    const msg = l10n.positiveNumber;

    expect(isValidCellSizeString("123")).toBe(true);
    expect(isValidCellSizeString("fwe32")).toBe(msg);
    expect(isValidCellSizeString("12.32")).toBe(msg);
    expect(isValidCellSizeString("0")).toBe(msg);
  });

  it("isValidPositiveNumericString", () => {
    const msg = l10n.positiveNumber;

    expect(isValidPositiveNumericString("1")).toBe(true);
    expect(isValidPositiveNumericString("0")).toBe(msg);
    expect(isValidPositiveNumericString("-1")).toBe(msg);
  });

  it("isValidNonNegativeNumericString", () => {
    const msg = l10n.nonNegativeNumber;

    expect(isValidNonNegativeNumericString("1")).toBe(true);
    expect(isValidNonNegativeNumericString("0")).toBe(true);
    expect(isValidNonNegativeNumericString("-1")).toBe(msg);
  });

  it("isValidCellsAmount", () => {
    const msg = `${l10n.maxCellsAmount} (${maxCellsAmount}).`;

    expect(isValidCellsAmountMax(40, 100, 100)).toBe(true);
    expect(isValidCellsAmountMax(1, 1000, 1000)).toBe(msg);
  });

  it("isAtLeastOneCellDisplayed", () => {
    const msg = l10n.minCellsAmount;

    expect(isAtLeastOneCellDisplayed(100, 100, 100)).toBe(true);
    expect(isAtLeastOneCellDisplayed(40, 39, 100)).toBe(msg);
    expect(isAtLeastOneCellDisplayed(20, 200, 19)).toBe(msg);
  });
});

import {
  isValidNumericString,
  isValidCellSizeString,
  isValidNonNegativeNumericString,
  isValidPositiveNumericString,
} from "@/utils/Validators";
import { minCellSize } from "@/components/Cell";

describe("Validators tests", () => {
  it("isValidNumericString should return valid results", () => {
    expect(isValidNumericString("1.5")).toBe(true);
    expect(isValidNumericString("1,5")).toBe(false);
    expect(isValidNumericString("q23")).toBe(false);
    expect(isValidNumericString("")).toBe(false);
    expect(isValidNumericString("4")).toBe(true);
  });

  it("isValidCellSizeString", () => {
    expect(isValidCellSizeString("100")).toBe(100 >= minCellSize);
    expect(isValidCellSizeString("11")).toBe(11 >= minCellSize);
    expect(isValidCellSizeString("10")).toBe(10 >= minCellSize);
    expect(isValidCellSizeString("5")).toBe(5 >= minCellSize);
    expect(isValidCellSizeString("fwe32")).toBe(false);
    expect(isValidCellSizeString("12.32")).toBe(false);
    expect(isValidCellSizeString("0")).toBe(false);
  });

  it("isValidPositiveNumericString", () => {
    expect(isValidPositiveNumericString("1")).toBe(true);
    expect(isValidPositiveNumericString("0")).toBe(false);
    expect(isValidPositiveNumericString("-1")).toBe(false);
  });

  it("isValidNonNegativeNumericString", () => {
    expect(isValidNonNegativeNumericString("1")).toBe(true);
    expect(isValidNonNegativeNumericString("0")).toBe(true);
    expect(isValidNonNegativeNumericString("-1")).toBe(false);
  });
});

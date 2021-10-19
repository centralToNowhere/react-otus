import { parser } from "./parser";
import { runner } from "./runner";

describe("Parser correct cases", () => {
  it("1 + 32", () => {
    expect(parser("1 + 32")).toEqual([1, "+", 32]);
  });

  it("11 + 3 * 22", () => {
    expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
  });

  it("1 + 32 - 2 + 2", () => {
    expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
  });

  it("1 + ( 32 - 2 ) + 2", () => {
    expect(parser("1 + ( 32 - 2 ) + 2")).toEqual([
      1,
      "+",
      "(",
      32,
      "-",
      2,
      ")",
      "+",
      2,
    ]);
  });

  it("( 1 + ( 32 - 2 ) ) + ( ( 2 + 4 ) - 1 )", () => {
    expect(parser("( 1 + ( 32 - 2 ) ) + ( ( 2 + 4 ) - 1 )")).toEqual([
      "(",
      1,
      "+",
      "(",
      32,
      "-",
      2,
      ")",
      ")",
      "+",
      "(",
      "(",
      2,
      "+",
      4,
      ")",
      "-",
      1,
      ")",
    ]);
  });
});

describe("Parser invalid cases", () => {
  it("1 + + 33 - 2", () => {
    expect(() => parser("1 + + 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("1 ! 33 - 2", () => {
    expect(() => parser("1 ! 33 - 2")).toThrow(TypeError("Unexpected string"));
  });

  it("1 + 3 ( 32 - 2 ) + 2", () => {
    expect(() => parser("1 + 3 ( 32 - 2 ) + 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("1 + ( 32 - 2 ( ) + 2", () => {
    expect(() => parser("1 + 3 ( 32 - 2 ( ) + 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("( ( 20 + 1 / ( 2 - 4 ) ) + 3", () => {
    expect(() => runner("( ( 20 + 1 / ( 2 - 4 ) ) + 3")).toThrow(
      TypeError("Unexpected string")
    );
  });
});

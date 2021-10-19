import { mul, div, add, minus, pow2, pow, fact } from "./mathOperators";

describe("mathOperators test cases", () => {
  it("mul 1 * 2 to equal 2", () => {
    expect(mul(1, 2)).toBe(2);
  });

  it("mul 2 * 2 to equal 4", () => {
    expect(mul(2, 2)).toBe(4);
  });

  it("div 2 / 2 to equal 1", () => {
    expect(div(2, 2)).toBe(1);
  });

  it("div 4 / 2 to equal 2", () => {
    expect(div(4, 2)).toBe(2);
  });

  it("add 4 + 2 to equal 6", () => {
    expect(add(4, 2)).toBe(6);
  });

  it("minus 4 - 2 to equal 2", () => {
    expect(minus(4, 2)).toBe(2);
  });

  it("pow 4 ^ 3 to equal 64", () => {
    expect(pow(4, 3)).toBe(64);
  });

  it("pow2 4 ** to equal 16", () => {
    expect(pow2(4)).toBe(16);
  });

  it("fact 4! to equal 24", () => {
    expect(fact(4)).toBe(24);
  });

  it("fact 0! to equal 1", () => {
    expect(fact(0)).toBe(1);
  });

  it("fact 1! to equal 1", () => {
    expect(fact(1)).toBe(1);
  });

  it("fact 2! to equal 2", () => {
    expect(fact(2)).toBe(2);
  });

  it("fact 5! to equal 120", () => {
    expect(fact(5)).toBe(120);
  });
});

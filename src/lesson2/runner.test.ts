import { runner } from "./runner";

describe("Runner simple cases", () => {
  it("1 * 32", () => {
    expect(runner("1 * 32")).toEqual(32);
  });

  it("2 * 32", () => {
    expect(runner("2 * 32")).toEqual(64);
  });

  it("2 + 32", () => {
    expect(runner("2 + 32")).toEqual(34);
  });

  it("2 ^ 3", () => {
    expect(runner("2 ^ 3")).toEqual(8);
  });

  it("3 **", () => {
    expect(runner("3 **")).toEqual(9);
  });
});

describe("Runner tripled/mixed cases", () => {
  it("2 * 2 * 3", () => {
    expect(runner("2 * 2 * 3")).toEqual(12);
  });

  it("2 * 2 + 3", () => {
    expect(runner("2 * 2 + 3")).toEqual(7);
  });

  it("2 + 2 * 3", () => {
    expect(runner("2 + 2 * 3")).toEqual(8);
  });

  it("2 ^ 3 + 4 **", () => {
    expect(runner("2 ^ 3 + 4 **")).toEqual(24);
  });

  it("2 ^ ( 3 + 4 ** )", () => {
    expect(runner("2 ^ ( 3 + 4 ** )")).toEqual(524288);
  });

  it("( 3 + 4 ) + ( 4 + 4 ) + ( 4 + 4 )", () => {
    expect(runner("( 3 + 4 ) + ( 4 + 4 ) + ( 4 + 4 )")).toEqual(23);
  });

  it("2 ^ ( 3 + 4 ** ) + ( 3 ^ 4 + 4 ) + 4 **", () => {
    expect(runner("2 ^ ( 3 + 4 ** ) + ( 3 ^ 4 + 4 ) + 4 **")).toEqual(524389);
  });

  it("2 ^ 2 ^ 2 + ( 4 + 2 ^ 2 ^ 2 ) ^ 2", () => {
    expect(runner("2 ^ 2 ^ 2 + ( 4 + 2 ^ 2 ^ 2 ) ^ 2")).toEqual(416);
  });

  it("( 5 + 7 ) **", () => {
    expect(runner("( 5 + 7 ) **")).toEqual(144);
  });
});

describe("Runner long cases", () => {
  it("20 + 1 * 10 - 5 * 3", () => {
    expect(runner("20 + 1 * 10 - 5 * 3")).toEqual(15);
  });

  it("20 - 10 * 10 / 5 - 3", () => {
    expect(runner("20 - 10 * 10 / 5 - 3")).toEqual(-3);
  });
});

describe("Runner cases with brackets", () => {
  it("( 20 + 1 ) * 10 - 5 * 3", () => {
    expect(runner("( 20 + 1 ) * 10 - 5 * 3")).toEqual(195);
  });

  it("( ( 20 + 1 ) * 10 - 5 ) * 3", () => {
    expect(runner("( ( 20 + 1 ) * 10 - 5 ) * 3")).toEqual(615);
  });

  it("( 20 + 1 ) * ( ( 10 - 5 ) / ( 3 + 4 ) )", () => {
    expect(runner("( 20 + 1 ) * ( ( 10 - 5 ) / ( 3 + 4 ) )")).toEqual(15);
  });

  it("( 20 + 1 ) * 10 - ( ( 5 - 3 ) / 2 )", () => {
    expect(runner("( 20 + 1 ) * 10 - ( ( 5 - 3 ) / 2 )")).toEqual(209);
  });

  it("( ( 20 + 1 ) / ( 2 - 4 ) ) + 3", () => {
    expect(runner("( ( 20 + 1 ) / ( 2 - 4 ) ) + 3")).toEqual(-7.5);
  });
});

describe("Runner cases with brackets errors", () => {
  it("( ( 20 + 1) / ( 2 - 4 ) ) + 3", () => {
    expect(() => runner("( ( 20 + 1) / ( 2 - 4 ) ) + 3")).toThrow(
      TypeError("Unexpected string")
    );
  });
});

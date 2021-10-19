import {
  bracketPrioritiesCalc,
  firstPrioritiesCalc,
  secondPrioritiesCalc,
} from "./engine";

describe("bracketsPrioritiesCalc simple cases", () => {
  it("[(, 2, *, 16, )]", () => {
    expect(bracketPrioritiesCalc(["(", 2, "*", 16, ")"])).toEqual(32);
  });

  it("[2, *, (, 2, +, 16, )]", () => {
    expect(bracketPrioritiesCalc([2, "*", "(", 2, "+", 16, ")"])).toEqual(36);
  });

  it("[2, *, (, 2, +, (, 2, +, 16, ), )]", () => {
    expect(
      bracketPrioritiesCalc([2, "*", "(", 2, "+", "(", 2, "+", 16, ")", ")"])
    ).toEqual(40);
  });
});

describe("firstPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(firstPrioritiesCalc([1, "*", 32])).toEqual([32]);
  });

  it("[32, /, 32]", () => {
    expect(firstPrioritiesCalc([32, "/", 32])).toEqual([1]);
  });

  it("[32, + 32]", () => {
    expect(firstPrioritiesCalc([32, "+", 32])).toEqual([32, "+", 32]);
  });
});

describe("firstPrioritiesCalc mixed with second priorities cases", () => {
  it("[32, /, 32, +, 10, *, 10]", () => {
    expect(firstPrioritiesCalc([32, "/", 32, "+", 10, "*", 10])).toEqual([
      1,
      "+",
      100,
    ]);
  });
});

describe("secondPrioritiesCalc invalid cases", () => {
  it("[32, / 32]", () => {
    expect(() => secondPrioritiesCalc([32, "/", 32])).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});

describe("secondPrioritiesCalc simple cases", () => {
  it("[32, + 32]", () => {
    expect(secondPrioritiesCalc([32, "+", 32])).toEqual(64);
  });

  it("[32, - 32]", () => {
    expect(secondPrioritiesCalc([32, "-", 32])).toEqual(0);
  });

  it("[32, - 32, +, 10]", () => {
    expect(secondPrioritiesCalc([32, "-", 32, "+", 10])).toEqual(10);
  });
});

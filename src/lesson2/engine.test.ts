import {
  bracketPrioritiesCalc,
  binaryExpPrioritiesCalc,
  firstPrioritiesCalc,
  secondPrioritiesCalc,
  unaryPrioritiesCalc,
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

describe("unaryPrioritiesCalc simple cases", () => {
  it("[2, **, +, 4]", () => {
    expect(unaryPrioritiesCalc([2, "**", "+", 4])).toEqual([4, "+", 4]);
  });

  it("[2, **, +, 4, **]", () => {
    expect(unaryPrioritiesCalc([2, "**", "+", 4, "**"])).toEqual([4, "+", 16]);
  });

  it("[4, !, *, 4, !]", () => {
    expect(unaryPrioritiesCalc([4, "!", "*", 4, "!"])).toEqual([24, "*", 24]);
  });
});

describe("binaryExpPrioritiesCalc simple cases", () => {
  it("[2, ^, 4]", () => {
    expect(binaryExpPrioritiesCalc([2, "^", 4])).toEqual([16]);
  });

  it("[3, *, 2, ^, 4]", () => {
    expect(binaryExpPrioritiesCalc([3, "*", 2, "^", 4])).toEqual([3, "*", 16]);
  });

  it("[2, ^, 2, ^, 2]", () => {
    expect(binaryExpPrioritiesCalc([2, "^", 2, "^", 2])).toEqual([16]);
  });

  it("[23 + 3, ^, 2, ^, 4 / 124]", () => {
    expect(
      binaryExpPrioritiesCalc([23, "+", 3, "^", 2, "^", 4, "/", 124])
    ).toEqual([23, "+", 43046721, "/", 124]);
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

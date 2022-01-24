import { Brackets } from "./brackets";

describe("Brackets enum cases", () => {
  it("(", () => {
    expect(Brackets.Opening).toEqual("(");
  });

  it(")", () => {
    expect(Brackets.Closing).toEqual(")");
  });
});

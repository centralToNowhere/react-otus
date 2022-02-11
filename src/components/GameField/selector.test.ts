import { getIndexedActiveCells } from "@/components/GameField";
import { ICell } from "@/components/Cell";

describe("getIndexedCells test", () => {
  const activeCells: ICell[] = [
    {
      x: 3,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
    {
      x: 5,
      y: 3,
    },
    {
      x: 8,
      y: 3,
    },
    {
      x: 3,
      y: 4,
    },
  ];

  it("result array should have correct length", () => {
    expect(getIndexedActiveCells(activeCells)).toHaveLength(5);
    expect(getIndexedActiveCells(activeCells)[2]).toHaveLength(4);
    expect(getIndexedActiveCells(activeCells)[3]).toHaveLength(9);
  });

  it("result array should contain values", () => {
    expect(getIndexedActiveCells(activeCells)[2][3]).toBe(true);
    expect(getIndexedActiveCells(activeCells)[3][5]).toBe(true);
  });

  it("result array should not contain values", () => {
    expect(getIndexedActiveCells(activeCells)[1]).toBe(undefined);
    expect(getIndexedActiveCells(activeCells)[3][6]).toBe(undefined);
  });
});

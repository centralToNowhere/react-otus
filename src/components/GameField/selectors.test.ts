import { getIndexedCells } from "@/components/GameField";
import { ICell } from "@/Cell/Cell";
import { selectGenerationNumber } from "@/components/GameField/selectors";
import { initialStateAllForTests } from "@/store/redux/store";

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
    expect(getIndexedCells([], 10, 10)).toHaveLength(100);
    expect(getIndexedCells([], 0, 0)).toHaveLength(0);
    expect(getIndexedCells([], 0, 10)).toHaveLength(0);
    expect(getIndexedCells([], 10, 0)).toHaveLength(0);
    expect(getIndexedCells([], 10, 1)).toHaveLength(10);
    expect(getIndexedCells([], 1, 10)).toHaveLength(10);
  });

  it("result array should contain 1", () => {
    /**
    {
      x: 5,
      y: 3,
    }
     */
    expect(getIndexedCells(activeCells, 10, 10)[3 * 10 + 5]).toBe(1);
    /**
    {
      x: 8,
      y: 3,
    }
     */
    expect(getIndexedCells(activeCells, 10, 10)[3 * 10 + 8]).toBe(1);
    /**
     {
      x: 3,
      y: 2,
    }
     */
    expect(getIndexedCells(activeCells, 10, 10)[2 * 10 + 3]).toBe(1);
    /**
     {
      x: 3,
      y: 3,
    }
     */
    expect(getIndexedCells(activeCells, 10, 10)[3 * 10 + 3]).toBe(1);
  });

  it("result array should contain 0", () => {
    expect(getIndexedCells(activeCells, 10, 10)[15]).toBe(0);
    expect(getIndexedCells(activeCells, 10, 10)[32]).toBe(0);
    expect(getIndexedCells(activeCells, 10, 10)[44]).toBe(0);
    expect(getIndexedCells(activeCells, 10, 10)[99]).toBe(0);
  });

  it("cell.x > cellsInRow & cell.y > cellsInCol ", () => {
    const indexedCells = getIndexedCells(
      [
        {
          x: 5,
          y: 5,
        },
        {
          x: 4,
          y: 4,
        },
        {
          x: 3,
          y: 5,
        },
        {
          x: 5,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 4,
          y: 3,
        },
      ],
      4,
      4
    );

    expect(indexedCells.filter((cell) => cell === 1)).toHaveLength(0);
  });
});

describe("selectGenerationNumber", () => {
  it("should increment generation number", () => {
    expect(
      selectGenerationNumber({
        ...initialStateAllForTests,
        gameField: {
          ...initialStateAllForTests.gameField,
          generations: 23,
        },
      })
    ).toBe(23);
  });
});

import {
  gameFieldSlice,
  resetCells,
  setActiveCells,
} from "@/components/GameField";
import { ICell } from "@/components/Cell";

describe("GameFieldSlice actions tests", () => {
  it("setActiveCells", () => {
    const activeCells: ICell[] = [
      {
        x: 5,
        y: 6,
      },
      {
        x: 24,
        y: 13,
      },
      {
        x: 123,
        y: 45,
      },
    ];

    const resultState = gameFieldSlice.reducer(
      {
        activeCells: [],
      },
      setActiveCells(activeCells)
    );

    expect(resultState).toEqual({
      activeCells,
    });
  });

  it("resetCells: should reset active cells to default", () => {
    const resultState = gameFieldSlice.reducer(
      {
        activeCells: [
          {
            x: 1,
            y: 1,
          },
        ],
      },
      resetCells()
    );

    expect(resultState).toEqual({
      activeCells: [],
    });
  });
});

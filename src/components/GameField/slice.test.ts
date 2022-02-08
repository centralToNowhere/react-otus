import {
  defaultGameFieldState,
  gameFieldSlice,
  resetCells,
  setActiveCells,
  startGame,
  stopGame,
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
        ...defaultGameFieldState,
        activeCells: [],
      },
      setActiveCells(activeCells)
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        activeCells,
      })
    );
  });

  it("resetCells: should reset active cells to default", () => {
    const resultState = gameFieldSlice.reducer(
      {
        ...defaultGameFieldState,
        activeCells: [
          {
            x: 1,
            y: 1,
          },
        ],
      },
      resetCells()
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        activeCells: [],
      })
    );
  });

  it("startGame", () => {
    const resultState = gameFieldSlice.reducer(
      {
        ...defaultGameFieldState,
      },
      startGame()
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        gameInProgress: true,
      })
    );
  });

  it("stopGame", () => {
    const resultState = gameFieldSlice.reducer(
      {
        ...defaultGameFieldState,
        gameInProgress: true,
      },
      stopGame()
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        gameInProgress: false,
      })
    );
  });
});

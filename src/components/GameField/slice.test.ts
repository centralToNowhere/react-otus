import {
  defaultGameFieldState,
  gameFieldSlice,
  resetCells,
  setActiveCells,
  startGame,
  stopGame,
  generateRandom,
  incrementGeneration,
} from "@/components/GameField";
import { ICell } from "@/Cell/Cell";

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

  it("generateRandom", () => {
    const initialState = {
      ...defaultGameFieldState,
      gameInProgress: true,
    };

    const resultState = gameFieldSlice.reducer(
      {
        ...defaultGameFieldState,
        gameInProgress: true,
      },
      generateRandom()
    );

    expect(resultState).toEqual(initialState);
  });

  it("incrementGeneration", () => {
    const resultState = gameFieldSlice.reducer(
      {
        ...defaultGameFieldState,
        generations: 0,
      },
      incrementGeneration()
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        generations: 1,
      })
    );
  });
});

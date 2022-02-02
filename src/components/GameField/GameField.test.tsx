import React from "react";
import { render, screen } from "@/utils/test-utils";
import { GameField } from "./GameField";
import {
  setActiveCells,
  resetCells,
  IGameFieldState,
  gameFieldSlice,
} from "./GameFieldRdx";
import { configureStore, EnhancedStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ICell } from "@/components/Cell";

describe("GameField tests", () => {
  it("should render game field", () => {
    const { asFragment } = render(<GameField />, {
      preloadedState: {
        fieldControl: {
          cellSize: 40,
          maxFieldWidth: 600,
          maxFieldHeight: 400,
          capacity: 50,
          speed: 2,
        },
      },
    });

    const field = screen.getByTestId("field");

    expect(field).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render 150 inactive cells", () => {
    render(<GameField />, {
      preloadedState: {
        fieldControl: {
          cellSize: 40,
          maxFieldWidth: 600,
          maxFieldHeight: 400,
          capacity: 50,
          speed: 2,
        },
      },
    });

    const cells: HTMLElement[] = screen.getAllByTestId("cell");
    expect(cells.length).toBe(150);

    cells.forEach((cell) => {
      expect(cell).not.toHaveStyle({
        background: "black",
      });
    });
  });

  describe("GameFieldSlice actions tests", () => {
    const store: EnhancedStore = configureStore({
      reducer: {
        gameField: gameFieldSlice.reducer,
      },
    });
    const dispatch: ThunkDispatch<IGameFieldState, unknown, AnyAction> =
      store.dispatch;

    it("setActiveCells: should change state correctly", () => {
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

      dispatch(setActiveCells(activeCells));

      expect(store.getState().gameField.activeCells).toEqual(activeCells);
    });

    it("resetCells: should reset active cells to default", () => {
      dispatch(resetCells());

      expect(store.getState().gameField.activeCells).toEqual([]);
    });
  });
});

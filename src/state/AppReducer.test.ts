import { AppReducer, IAppState, initialState } from "@/state/AppReducer";
import {
  ResetGameStateAction,
  SetActiveCellsAction,
  SetCellSizeAction,
  SetCapacityAction,
  SetFieldHeightAction,
  SetFieldWidthAction,
  SetSpeedAction,
  SetPlayerAction,
  ResetStateAction,
} from "@/state/actions";
import { ICell } from "@/components/Cell";

describe("AppReducer tests", () => {
  it("activeCells should be [{x: 1, y: 1}, {x: 2, y: 2}]", () => {
    const activeCells: ICell[] = [
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 2,
      },
    ];

    expect(AppReducer(initialState, SetActiveCellsAction(activeCells))).toEqual(
      {
        ...initialState,
        activeCells,
      }
    );
  });

  it("cellSize should be 22", () => {
    const cellSize = 22;

    expect(AppReducer(initialState, SetCellSizeAction(cellSize))).toEqual({
      ...initialState,
      cellSize,
    });
  });

  it("fieldWidth should be 1300", () => {
    const fieldWidth = 1300;

    expect(AppReducer(initialState, SetFieldWidthAction(fieldWidth))).toEqual({
      ...initialState,
      maxFieldWidth: fieldWidth,
    });
  });

  it("fieldHeight should be 234", () => {
    const fieldHeight = 234;

    expect(AppReducer(initialState, SetFieldHeightAction(fieldHeight))).toEqual(
      {
        ...initialState,
        maxFieldHeight: fieldHeight,
      }
    );
  });

  it("speed should be 5", () => {
    const speed = 5;

    expect(AppReducer(initialState, SetSpeedAction(speed))).toEqual({
      ...initialState,
      speed,
    });
  });

  it("capacity should be 95", () => {
    const capacity = 95;

    expect(AppReducer(initialState, SetCapacityAction(capacity))).toEqual({
      ...initialState,
      capacity,
    });
  });

  it("player should be set to {registered: true, name: Ivan}", () => {
    const player = {
      registered: true,
      name: "Ivan",
    };

    expect(AppReducer(initialState, SetPlayerAction(player))).toEqual({
      ...initialState,
      player,
    });
  });

  it("only game state should be reset to initial", () => {
    const player = {
      registered: true,
      name: "Ivan",
    };

    const currentState: IAppState = {
      maxFieldWidth: 100,
      maxFieldHeight: 100,
      cellSize: 12,
      capacity: 85,
      speed: 6,
      player: player,
      activeCells: [
        { x: 5, y: 8 },
        { x: 2, y: 4 },
      ],
    };

    expect(AppReducer(currentState, ResetGameStateAction())).toEqual({
      ...initialState,
      player: player,
    });
  });

  it("state should be reset to initial", () => {
    const currentState: IAppState = {
      maxFieldWidth: 100,
      maxFieldHeight: 100,
      cellSize: 12,
      capacity: 85,
      speed: 6,
      player: {
        registered: true,
        name: "Ivan",
      },
      activeCells: [
        { x: 5, y: 8 },
        { x: 2, y: 4 },
      ],
    };

    expect(AppReducer(currentState, ResetStateAction())).toEqual(initialState);
  });
});

import { ICell } from "../components/Cell";
import { AnyAction } from "redux";

export interface IActionSwitchAliveOrDead extends AnyAction {
  type: string;
  number: number;
}

export interface IActionSetCells extends AnyAction {
  type: string;
  cells: ICell[];
}

export function isActionSetCells(action: AnyAction): action is IActionSetCells {
  return action.type === "SET_CELLS";
}

export function isActionSwitchAliveOrDead(
  action: AnyAction
): action is IActionSwitchAliveOrDead {
  return action.type === "SWITCH_ALIVE_OR_DEAD";
}

export const setCellsAction = (cells: ICell[][]): IActionSetCells => {
  return {
    type: "SET_CELLS",
    cells: cells.reduce((acc, cell) => {
      return acc.concat(cell);
    }, []),
  };
};

export const switchAliveOrDeadAction = (
  number: number
): IActionSwitchAliveOrDead => {
  return {
    type: "SWITCH_ALIVE_OR_DEAD",
    number: number,
  };
};

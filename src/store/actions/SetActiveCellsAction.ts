import { AppAction } from "@/store";
import { ICell } from "@/components/Cell";

interface ISetActiveCellsAction extends AppAction {
  type: "setActiveCells";
  payload: ICell[];
}

export const SetActiveCellsAction = (cells: ICell[]) => {
  return {
    type: "setActiveCells",
    payload: cells,
  };
};

export function isSetActiveCellsAction(
  action: AppAction
): action is ISetActiveCellsAction {
  return action.type === "setActiveCells";
}

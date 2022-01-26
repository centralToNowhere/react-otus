import { AppAction } from "@/store";

interface ISetCellSizeAction extends AppAction {
  type: "setCellSize";
  payload: number;
}

export const SetCellSizeAction = (cellSize: number) => {
  return {
    type: "setCellSize",
    payload: cellSize,
  };
};

export function isSetCellSizeAction(
  action: AppAction
): action is ISetCellSizeAction {
  return action.type === "setCellSize";
}

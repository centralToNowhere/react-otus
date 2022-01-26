import { AppAction } from "@/store";

interface ISetFieldHeightAction extends AppAction {
  type: "setFieldHeight";
  payload: number;
}

export const SetFieldHeightAction = (fieldHeight: number) => {
  return {
    type: "setFieldHeight",
    payload: fieldHeight,
  };
};

export function isSetFieldHeightAction(
  action: AppAction
): action is ISetFieldHeightAction {
  return action.type === "setFieldHeight";
}

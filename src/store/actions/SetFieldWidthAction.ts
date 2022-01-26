import { AppAction } from "@/store";

interface ISetFieldWidthAction extends AppAction {
  type: "setFieldWidth";
  payload: number;
}

export const SetFieldWidthAction = (fieldWidth: number) => {
  return {
    type: "setFieldWidth",
    payload: fieldWidth,
  };
};

export function isSetFieldWidthAction(
  action: AppAction
): action is ISetFieldWidthAction {
  return action.type === "setFieldWidth";
}

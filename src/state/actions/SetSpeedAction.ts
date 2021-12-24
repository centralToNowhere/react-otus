import { AppAction } from "@/state";

interface ISetSpeedAction extends AppAction {
  type: "setSpeed";
  payload: number;
}

export const SetSpeedAction = (fieldWidth: number) => {
  return {
    type: "setSpeed",
    payload: fieldWidth,
  };
};

export function isSetSpeedAction(action: AppAction): action is ISetSpeedAction {
  return action.type === "setSpeed";
}

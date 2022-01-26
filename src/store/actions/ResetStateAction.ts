import { AppAction } from "@/store";

interface IResetStateAction extends AppAction {
  type: "resetState";
}

export const isResetStateAction = (
  action: AppAction
): action is IResetStateAction => {
  return action.type === "resetState";
};

export const ResetStateAction = (): IResetStateAction => {
  return {
    type: "resetState",
  };
};

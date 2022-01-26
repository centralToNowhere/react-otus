import { AppAction } from "@/store";

interface IResetGameStateAction extends AppAction {
  type: "resetGameState";
}

export const isResetGameStateAction = (
  action: AppAction
): action is IResetGameStateAction => {
  return action.type === "resetGameState";
};

export const ResetGameStateAction = (): IResetGameStateAction => {
  return {
    type: "resetGameState",
  };
};

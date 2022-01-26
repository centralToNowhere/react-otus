import { AppAction } from "@/store";
import { IPlayer } from "@/store/actions";

interface ISetPlayerAction extends AppAction {
  type: "setPlayer";
  payload: IPlayer;
}

export const SetPlayerAction = (player: IPlayer) => {
  return {
    type: "setPlayer",
    payload: player,
  };
};

export function isSetPlayerAction(
  action: AppAction
): action is ISetPlayerAction {
  return action.type === "setPlayer";
}

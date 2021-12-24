import { AppAction } from "@/state";

interface ISetCapacityAction extends AppAction {
  type: "setCapacity";
  payload: number;
}

export const SetCapacityAction = (capacity: number) => {
  return {
    type: "setCapacity",
    payload: capacity,
  };
};

export function isSetCapacityAction(
  action: AppAction
): action is ISetCapacityAction {
  return action.type === "setCapacity";
}

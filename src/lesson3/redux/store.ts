import { createStore } from "redux";
import { ICell } from "../components/Cell";
import { isActionSwitchAliveOrDead, isActionSetCells } from "./actions";
import { AnyAction } from "redux";

export interface IState {
  cells: ICell[];
}

const initialState: IState = {
  cells: [],
};

export const reducer = (state: IState = initialState, action: AnyAction) => {
  if (isActionSetCells(action)) {
    return {
      ...state,
      cells: action.cells,
    };
  }

  if (isActionSwitchAliveOrDead(action)) {
    return {
      ...state,
      cells: state.cells.map((cell) => {
        return cell.number === action.number
          ? {
              ...cell,
              alive: !cell.alive,
            }
          : cell;
      }),
    };
  }

  return state;
};

const store = createStore(reducer);
export default store;

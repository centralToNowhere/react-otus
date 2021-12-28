import { ICell } from "@/components/Cell";
import * as Actions from "./actions";

export interface IAppState {
  cellSize: number;
  maxFieldWidth: number;
  maxFieldHeight: number;
  capacity: number;
  speed: number;
  activeCells: ICell[];
}

export interface AppAction {
  type: string;
}

export const initialState: IAppState = {
  cellSize: 40,
  maxFieldWidth: window.innerWidth,
  maxFieldHeight: window.innerHeight / 2,
  capacity: 50,
  speed: 2,
  activeCells: [],
};

export const AppReducer = (state: IAppState, action: AppAction): IAppState => {
  if (Actions.isSetActiveCellsAction(action)) {
    return {
      ...state,
      activeCells: action.payload,
    };
  }

  if (Actions.isSetCellSizeAction(action)) {
    return {
      ...state,
      cellSize: action.payload,
    };
  }

  if (Actions.isSetCapacityAction(action)) {
    return {
      ...state,
      capacity: action.payload,
    };
  }

  if (Actions.isSetFieldWidthAction(action)) {
    return {
      ...state,
      maxFieldWidth: action.payload,
    };
  }

  if (Actions.isSetFieldHeightAction(action)) {
    return {
      ...state,
      maxFieldHeight: action.payload,
    };
  }

  if (Actions.isSetSpeedAction(action)) {
    return {
      ...state,
      speed: action.payload,
    };
  }

  if (Actions.isResetStateAction(action)) {
    return {
      ...initialState,
    };
  }

  return state;
};

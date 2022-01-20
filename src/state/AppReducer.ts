import { ICell } from "@/components/Cell";
import * as Actions from "./actions";
import { IPlayer } from "@/state/actions/Player/Player";
import { getPlayer } from "@/auth/Auth";
import { getInitialCells } from "@/utils/CellGenerator";

export interface IAppState {
  cellSize: number;
  maxFieldWidth: number;
  maxFieldHeight: number;
  capacity: number;
  speed: number;
  activeCells: ICell[];
  player: IPlayer;
}

export interface AppAction {
  type: string;
}

export const defaultPlayer: IPlayer = {
  registered: false,
  name: null,
};

const initialWidth = window.innerWidth;
const initialHeight = window.innerHeight / 2;
const initialCellSize = 40;

export const initialState: IAppState = {
  cellSize: initialCellSize,
  maxFieldWidth: initialWidth,
  maxFieldHeight: initialHeight,
  capacity: 50,
  speed: 2,
  activeCells: getInitialCells(initialWidth, initialHeight, initialCellSize),
  player: getPlayer() || defaultPlayer,
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

  if (Actions.isSetPlayerAction(action)) {
    return {
      ...state,
      player: action.payload,
    };
  }

  if (Actions.isResetGameStateAction(action)) {
    return {
      ...state,
      activeCells: initialState.activeCells,
      capacity: initialState.capacity,
      maxFieldHeight: initialState.maxFieldHeight,
      maxFieldWidth: initialState.maxFieldWidth,
      speed: initialState.speed,
      cellSize: initialState.cellSize,
    };
  }

  if (Actions.isResetStateAction(action)) {
    return {
      ...initialState,
    };
  }

  return state;
};

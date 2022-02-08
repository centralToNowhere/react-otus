export { GameField } from "./GameField";
export {
  gameFieldSlice,
  setActiveCells,
  resetCells,
  startGame,
  stopGame,
  defaultGameFieldState,
} from "./slice";
export { selectActiveCellsIndexed, getIndexedActiveCells } from "./selectors";
export type { IGameFieldProps } from "./GameField";
export type { IGameFieldState } from "./slice";

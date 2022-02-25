export { GameField } from "./GameField";
export {
  gameFieldSlice,
  setActiveCells,
  setActiveCell,
  setInactiveCell,
  resetCells,
  startGame,
  stopGame,
  generateRandom,
  defaultGameFieldState,
} from "./slice";
export { selectIndexedCells, getIndexedCells } from "./selectors";
export type { IGameFieldProps } from "./GameField";
export type { IGameFieldState } from "./slice";

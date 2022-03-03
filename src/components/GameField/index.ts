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
  incrementGeneration,
  defaultGameFieldState,
} from "./slice";
export {
  selectIndexedCells,
  getIndexedCells,
  selectGenerationNumber,
} from "./selectors";
export type { IGameFieldProps } from "./GameField";
export type { IGameFieldState } from "./slice";

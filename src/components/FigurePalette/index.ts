export {
  FigurePalette,
  paletteActiveCancelText,
  paletteActiveText,
} from "./FigurePalette";
export { FigurePaletteContainer } from "./FigurePaletteContainer";
export {
  figurePaletteSlice,
  setFigures,
  setFigurePaletteActive,
  setCurrentFigureIndex,
  resetPalette,
} from "./slice";
export { selectFigures } from "./selectors";
export type { IFigurePaletteState } from "./slice";
export type { CellFigure } from "@/components/FigurePalette/FigurePaletteContainer";

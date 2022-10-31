import React, {
  createRef,
  Dispatch,
  MouseEventHandler,
  MutableRefObject,
} from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { ICell, IndexedCells } from "@/Cell/Cell";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store/redux/store";
import { selectCellsInCol, selectCellsInRow } from "@/components/Fields";
import { selectIndexedCells } from "@/components/GameField/selectors";
import { setActiveCell, setInactiveCell } from "@/components/GameField/slice";
import {
  selectFigures,
  selectPaletteActive,
  selectPaletteCurrent,
} from "@/components/FigurePalette/selectors";

const mapStateToProps = (state: RootState) => {
  return {
    cellSize: state.fieldControl.cellSize,
    indexedCells: selectIndexedCells(state),
    cellsInRow: selectCellsInRow(state),
    cellsInCol: selectCellsInCol(state),
    paletteFigures: selectFigures(state),
    figurePaletteActive: selectPaletteActive(state),
    currentFigureIndex: selectPaletteCurrent(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setActiveCell: (cell: ICell) => {
    dispatch(setActiveCell(cell));
  },
  setInactiveCell: (cell: ICell) => {
    dispatch(setInactiveCell(cell));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type IGameFieldProps = ConnectedProps<typeof connector>;

export class Main extends React.PureComponent<IGameFieldProps> {
  private readonly gameFieldRef: MutableRefObject<HTMLDivElement | null>;

  constructor(props: IGameFieldProps) {
    super(props);
    this.gameFieldRef = createRef<HTMLDivElement | null>();
    this.renderCells = this.renderCells.bind(this);
  }

  renderCells() {
    const cellsArr: IndexedCells = [];
    cellsArr.length = this.props.cellsInCol * this.props.cellsInRow;
    cellsArr.fill(0);

    return Object.assign(cellsArr, this.props.indexedCells).map(
      (cellState, i) => {
        return (
          <div
            className={`cell${cellState ? " cell-active" : ""}`}
            key={i}
            data-testid="cell"
            data-state={!!cellState}
            aria-label={String(i + 1)}
          />
        );
      }
    );
  }

  onFigurePlacement(topLeft: ICell) {
    const figureIndex = this.props.currentFigureIndex;
    const figure = this.props.paletteFigures[figureIndex];
    const offsetX = topLeft.x;
    const offsetY = topLeft.y;

    if (figure) {
      const figureCellsInRow = figure.cellsInRow;

      figure.indexedCells.forEach((cellState, i) => {
        const cell = {
          x: (i % figureCellsInRow) + offsetX,
          y: Math.floor(i / figureCellsInRow) + offsetY,
        };

        if (cellState) {
          this.props.setActiveCell(cell);
        } else {
          this.props.setInactiveCell(cell);
        }
      });
    }
  }

  onCellToggle(state: string | undefined, cell: ICell) {
    if (state === "true") {
      this.props.setInactiveCell(cell);
      return;
    }

    this.props.setActiveCell(cell);
  }

  onCellClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.target as HTMLDivElement;
    const state = el.dataset.state;
    const number = Number(el.getAttribute("aria-label"));

    const i = Math.ceil(number / this.props.cellsInRow) - 1;
    const j = number - i * this.props.cellsInRow - 1;
    const cell: ICell = {
      x: j,
      y: i,
    };

    if (this.props.figurePaletteActive) {
      this.onFigurePlacement(cell);
      return;
    }

    this.onCellToggle(state, cell);
  };

  render() {
    return (
      <StyledGameField
        onClick={this.onCellClick}
        className={"game-field"}
        cellSize={this.props.cellSize}
        cellsInRow={this.props.cellsInRow}
        cellsInCol={this.props.cellsInCol}
        data-testid={"field"}
      >
        {this.renderCells()}
      </StyledGameField>
    );
  }
}

export const GameField = connector(Main);

interface IFieldStyledContainerProps {
  cellSize: number;
  cellsInRow: number;
  cellsInCol: number;
}

const StyledGameField = styled.div<IFieldStyledContainerProps>`
  width: ${(props) => props.cellsInRow * props.cellSize}px;
  cursor: pointer;
  height: ${(props) => props.cellsInCol * props.cellSize}px;
  display: flex;
  flex-wrap: wrap;
  background: ${COLORS.cellBg};
  margin: 0 auto;

  .cell {
    transition: ${(props) =>
      props.cellsInRow * props.cellsInCol < 1000
        ? "0.5s ease background"
        : "none"};
    width: ${(props) => (props.cellSize ? props.cellSize : 10)}px;
    height: ${(props) => (props.cellSize ? props.cellSize : 10)}px;
    line-height: ${(props) => props.cellSize}px;
    text-align: center;
    border: ${(props) =>
      props.cellSize > 2 ? `1px solid ${COLORS.secondary}` : "none"};
  }

  .cell-active {
    background: ${COLORS.activeCellBg};
  }
`;

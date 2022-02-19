import React, { createRef, Dispatch, MutableRefObject } from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { ICell } from "@/Cell/Cell";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store/redux/store";
import { selectCellsInCol, selectCellsInRow } from "@/components/Fields";
import { selectIndexedCells } from "@/components/GameField/selectors";
import { setActiveCell, setInactiveCell } from "@/components/GameField/slice";

const mapStateToProps = (state: RootState) => {
  return {
    cellSize: state.fieldControl.cellSize,
    indexedCells: selectIndexedCells(state),
    cellsInRow: selectCellsInRow(state),
    cellsInCol: selectCellsInCol(state),
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

export class Main extends React.Component<IGameFieldProps> {
  private readonly gameFieldRef: MutableRefObject<HTMLDivElement | null>;

  constructor(props: IGameFieldProps) {
    super(props);
    this.gameFieldRef = createRef<HTMLDivElement | null>();
    this.renderCells = this.renderCells.bind(this);
  }

  renderCells() {
    const cellsArr: Array<1 | 0> = [];
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

  onCellToggle = (e: MouseEvent) => {
    const el = e.target as HTMLDivElement;
    const state = el.dataset?.state;
    const number = Number(el.getAttribute("aria-label"));

    if (isNaN(number) || !state) {
      return;
    }

    const i = Math.ceil(number / this.props.cellsInRow) - 1;
    const j = number - i * this.props.cellsInRow - 1;
    const cell: ICell = {
      x: j,
      y: i,
    };

    if (state === "true") {
      this.props.setInactiveCell(cell);
    }

    if (state === "false") {
      this.props.setActiveCell(cell);
    }
  };

  componentDidMount() {
    if (this.gameFieldRef.current) {
      this.gameFieldRef.current.addEventListener("click", this.onCellToggle);
    }
  }

  componentWillUnmount() {
    if (this.gameFieldRef.current) {
      this.gameFieldRef.current.removeEventListener("click", this.onCellToggle);
    }
  }

  render() {
    return (
      <FieldContainer
        ref={this.gameFieldRef}
        className={"game-field"}
        cellSize={this.props.cellSize}
        cellsInRow={this.props.cellsInRow}
        cellsInCol={this.props.cellsInCol}
        data-testid={"field"}
      >
        {this.renderCells()}
      </FieldContainer>
    );
  }
}

export const GameField = connector(Main);

interface IFieldStyledContainerProps {
  cellSize: number;
  cellsInRow: number;
  cellsInCol: number;
}

const FieldContainer = styled.div<IFieldStyledContainerProps>`
  width: ${(props) => props.cellsInRow * props.cellSize}px;
  cursor: pointer;
  height: ${(props) => props.cellsInCol * props.cellSize}px;
  display: flex;
  flex-wrap: wrap;
  background: ${COLORS.primary};
  margin: 0 auto;

  .cell {
    transition: ${(props) =>
      props.cellsInRow * props.cellsInCol < 1000
        ? "0.5s ease background"
        : "none"};
    width: ${(props) => (props.cellSize ? props.cellSize : 10)}px;
    height: ${(props) => (props.cellSize ? props.cellSize : 10)}px;
    line-height: ${(props) => props.cellSize}px;
    outline: 1px solid white;
    text-align: center;
  }

  .cell-active {
    background: ${COLORS.activeCellBg};
  }
`;

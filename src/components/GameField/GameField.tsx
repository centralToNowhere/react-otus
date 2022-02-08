import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { Cell } from "@/components/Cell";
import { connect } from "react-redux";
import { RootState } from "@/store/redux/store";
import { selectCellsInCol, selectCellsInRow } from "@/components/Fields";
import { selectActiveCellsIndexed } from "@/components/GameField/selectors";

export interface IGameFieldProps {
  cellSize: number;
  activeCellsIndexed: boolean[][];
  cellsInRow: number;
  cellsInCol: number;
}

export class Main extends React.Component<IGameFieldProps> {
  renderCells() {
    const cellsInCol = this.props.cellsInCol;
    const cellsInRow = this.props.cellsInRow;

    return Array.from(Array(cellsInCol)).map((col, i) =>
      Array.from(Array(cellsInRow)).map((row, j) => {
        const isActive = Boolean(this.props.activeCellsIndexed?.[i]?.[j]);

        return (
          <Cell
            cssClassName={`cell${isActive ? " cell-active" : ""}`}
            key={(i + 1) * (j + 1)}
            isActive={isActive}
            number={(i + 1) * cellsInRow - (cellsInRow - (j + 1))}
          />
        );
      })
    );
  }

  shouldComponentUpdate(nextProps: Readonly<IGameFieldProps>): boolean {
    return nextProps.cellSize >= 10;
  }

  render() {
    return (
      <FieldContainer
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

const mapStateToProps = (state: RootState): IGameFieldProps => ({
  cellSize: state.fieldControl.cellSize,
  activeCellsIndexed: selectActiveCellsIndexed(state),
  cellsInRow: selectCellsInRow(state),
  cellsInCol: selectCellsInCol(state),
});

export const GameField = connect(mapStateToProps)(Main);

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
    width: ${(props) => props.cellSize}px;
    height: ${(props) => props.cellSize}px;
    line-height: ${(props) => props.cellSize}px;
  }

  .cell-active {
    background: ${COLORS.activeCellBg};
  }
`;

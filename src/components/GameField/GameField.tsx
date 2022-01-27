import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { Cell, ICell, isCell } from "@/components/Cell";
import { connect } from "react-redux";
import { RootState } from "@/store/redux/store";
import { getCellsInCol, getCellsInRow } from "@/utils/CellGenerator";

export interface IGameFieldProps {
  cellSize: number;
  activeCells: ICell[];
  cellsInRow: number;
  cellsInCol: number;
}

export class Main extends React.Component<IGameFieldProps> {
  isActiveCell = (cell: ICell): boolean => {
    return !!this.props.activeCells.find(
      (activeCell: ICell) =>
        isCell(activeCell) && activeCell.x === cell.x && activeCell.y === cell.y
    );
  };

  renderCells() {
    const cellsInCol = this.props.cellsInCol;
    const cellsInRow = this.props.cellsInRow;

    return Array.from(Array(cellsInCol)).map((col, i) =>
      Array.from(Array(cellsInRow)).map((row, j) => (
        <Cell
          key={(i + 1) * (j + 1)}
          size={this.props.cellSize}
          isActive={this.isActiveCell({ x: j, y: i })}
          number={(i + 1) * cellsInRow - (cellsInRow - (j + 1))}
        />
      ))
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
  activeCells: state.gameField.activeCells,
  cellsInRow: getCellsInRow(
    state.fieldControl.maxFieldWidth,
    state.fieldControl.cellSize
  ),
  cellsInCol: getCellsInCol(
    state.fieldControl.maxFieldHeight,
    state.fieldControl.cellSize
  ),
});

export const GameField = connect(mapStateToProps)(Main);

interface IFieldStyledContainerProps {
  cellSize: number;
  cellsInRow: number;
  cellsInCol: number;
}

const FieldContainer = styled.div<IFieldStyledContainerProps>`
  width: ${(props) => props.cellsInRow * props.cellSize}px;
  border-bottom: 1px solid black;
  outline: 1px solid black;
  cursor: pointer;
  height: ${(props) => props.cellsInCol * props.cellSize}px;
  display: flex;
  flex-wrap: wrap;
  background: ${COLORS.primary};
  margin: 0 auto;
`;

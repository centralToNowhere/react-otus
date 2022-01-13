import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { Cell, ICell, isCell } from "@/components/Cell";
import {SetPlayerAction} from "@/state/actions";

export interface IGameFieldProps {
  cellSize: number;
  activeCells?: ICell[];
  cellsInRow: number;
  cellsInCol: number;
}

type GameFieldProps = typeof GameField.defaultProps & IGameFieldProps;

export class GameField extends React.Component<GameFieldProps> {
  static defaultProps = {
    activeCells: [] as ICell[],
  };

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

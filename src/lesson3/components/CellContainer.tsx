import React from "react";
import { useSelector } from "react-redux";
import Cell, { ICell, isCell } from "./Cell";
import { IState } from "../redux/store";

export interface ICellContainerProps {
  number: number;
  width: number;
  onCellClick: (number: number) => void;
}

const CellContainer = (props: ICellContainerProps) => {
  const { number, onCellClick, width } = props;
  const cell: ICell | undefined = useSelector((state: IState) =>
    state.cells.find((c) => {
      return c.number === number;
    })
  );

  if (!isCell(cell)) {
    return null;
  }

  const cellContainerStyles = {
    width,
    height: width,
    fontSize: width,
  };

  return (
    <div
      className="container-cell"
      style={cellContainerStyles}
      onClick={() => {
        onCellClick(number);
      }}
    >
      <Cell
        number={number}
        alive={cell.alive}
        backgroundColor={cell.backgroundColor}
      />
    </div>
  );
};

export default CellContainer;

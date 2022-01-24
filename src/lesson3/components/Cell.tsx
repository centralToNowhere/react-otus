import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../redux/store";

export interface ICell {
  number: number;
  backgroundColor: string;
  alive: boolean;
}

export interface ICellProps {
  number: number;
  width: number;
  onCellClick: (number: number) => void;
}

export function isCell(cell: ICell | unknown): cell is ICell {
  if (cell === null || typeof cell !== "object") {
    return false;
  }

  return (
    "number" in (cell as ICell) &&
    "backgroundColor" in (cell as ICell) &&
    "alive" in (cell as ICell)
  );
}

const Cell = (props: ICellProps) => {
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

  const cellStyles: object = {
    backgroundColor: cell.alive ? cell.backgroundColor : null,
  };

  return (
    <div
      className="container-cell"
      style={cellContainerStyles}
      onClick={() => {
        onCellClick(number);
      }}
    >
      <div className="cell" style={cellStyles} data-testid="cell">
        {cell.alive ? number : null}
      </div>
    </div>
  );
};

export default Cell;

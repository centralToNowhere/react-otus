import React from "react";

export interface ICell {
  number: number;
  backgroundColor: string;
  alive: boolean;
}

type CellProps = ICell;

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

const Cell = (props: CellProps) => {
  const { number, backgroundColor, alive } = props;

  const cellStyles: object = {
    backgroundColor: alive ? backgroundColor : null,
  };

  return (
    <div className="cell" style={cellStyles} data-testid="cell">
      {alive ? number : null}
    </div>
  );
};

export default Cell;

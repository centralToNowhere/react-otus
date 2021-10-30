import React from "react";
import { Cell } from "./Field";

interface CellProps extends Cell {
  width: number;
  onCellClick: (number: number) => void;
}

const CellElement = (props: CellProps) => {
  const { width, number, backgroundColor, alive, onCellClick } = props;

  const cellContainerStyles = {
    width,
    height: width,
  };

  const cellStyles: object = {
    backgroundColor: alive ? backgroundColor : null,
    fontSize: width / 2,
    lineHeight: `${width}px`,
  };

  function handleClick() {
    onCellClick(number);
  }

  return (
    <div
      className="container-cell"
      style={cellContainerStyles}
      onClick={handleClick}
    >
      <div className="cell" style={cellStyles} data-testid="cell">
        {alive ? number : null}
      </div>
    </div>
  );
};

export default CellElement;

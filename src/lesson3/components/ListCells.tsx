import React from "react";
import { Cell } from "./Field";
import CellElement from "./Cell";

interface LinkCellsProps {
  cells: Cell[][];
  cellSize: number;
  cellPadding: number;
  onCellClick: (number: number) => void;
}

const ListCells = (props: LinkCellsProps) => {
  const { cells, cellSize, cellPadding, onCellClick } = props;

  const renderCells = (cells: Cell[][], cellSize: number): JSX.Element[] => {
    const rowSize = cells.length;
    const renderArray = [];

    for (let i = 0; i < rowSize; i++) {
      for (let j = 0; j < rowSize; j++) {
        const c = cells[i][j];
        renderArray.push(
          <CellElement
            width={cellSize}
            number={c.number}
            key={c.number}
            backgroundColor={c.backgroundColor}
            alive={c.alive}
            onCellClick={onCellClick}
          />
        );
      }
    }

    return renderArray;
  };

  const listStyle = {
    padding: cellPadding,
  };

  return (
    <div className="container-list" data-testid="list-cells" style={listStyle}>
      {renderCells(cells, cellSize)}
    </div>
  );
};

export default ListCells;

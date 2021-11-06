import React from "react";
import { ICell } from "./Cell";
import CellContainer from "./CellContainer";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCellsAction, switchAliveOrDeadAction } from "../redux/actions";
import { IState } from "../redux/store";

interface ListCellsProps {
  cells: ICell[][];
  cellSize: number;
  cellPadding: number;
}

const ListCells = (props: ListCellsProps) => {
  const { cells, cellSize, cellPadding } = props;
  const dispatch = useDispatch();

  dispatch(setCellsAction(cells));

  const renderCells = (): JSX.Element[] => {
    const cellNumbers: number[] = useSelector((state: IState) => {
      return state.cells.map((c: ICell) => {
        return c.number;
      });
    }, shallowEqual);

    return cellNumbers.map((number: number) => {
      return (
        <CellContainer
          key={number}
          number={number}
          width={cellSize}
          onCellClick={(n) => {
            dispatch(switchAliveOrDeadAction(n));
          }}
        />
      );
    });
  };

  const listStyle = {
    padding: cellPadding,
  };

  return (
    <div className="container-list" data-testid="list-cells" style={listStyle}>
      {renderCells()}
    </div>
  );
};

export default ListCells;

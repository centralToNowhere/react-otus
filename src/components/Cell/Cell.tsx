import React from "react";
import "@/components/Cell/cell.css";

export interface ICell {
  x: number;
  y: number;
}

export interface ICellProps {
  isActive: boolean;
  number: number;
  cssClassName: string;
}

export const minCellSize = 10;

export const isCell = (cell: ICell): cell is ICell => {
  return (
    cell !== null &&
    typeof cell === "object" &&
    typeof cell.x === "number" &&
    typeof cell.y === "number"
  );
};

export class Cell extends React.PureComponent<ICellProps> {
  constructor(props: ICellProps) {
    super(props);
  }

  render() {
    return (
      <div
        className={this.props.cssClassName}
        data-testid="cell"
        data-state={this.props.isActive}
        aria-label={String(this.props.number)}
      />
    );
  }
}

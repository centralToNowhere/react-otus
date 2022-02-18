import React from "react";
import "@/components/Cell/cell.css";

export interface ICell {
  x: number;
  y: number;
}

export interface ICellProps {
  isActive: 1 | 0;
  number: number;
  cssClassName: string;
}

export const minCellSize = 10;

export class Cell extends React.PureComponent<ICellProps> {
  render() {
    return (
      <div
        className={this.props.cssClassName}
        data-testid="cell"
        data-state={!!this.props.isActive}
        aria-label={String(this.props.number)}
      />
    );
  }
}

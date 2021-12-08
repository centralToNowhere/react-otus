import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

export interface ICell {
  x: number;
  y: number;
}

export interface ICellProps {
  size: number;
  isActive: boolean;
  number: number;
}

export const minCellSize = 10;

type StyledCellProps = Omit<ICellProps, "number">;

export const isCell = (cell: ICell): cell is ICell => {
  return (
    cell !== null &&
    typeof cell === "object" &&
    typeof cell.x === "number" &&
    typeof cell.y === "number"
  );
};

export class Cell extends React.Component<ICellProps> {
  constructor(props: ICellProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<ICellProps>): boolean {
    return (
      nextProps.size !== this.props.size ||
      nextProps.isActive !== this.props.isActive ||
      nextProps.number !== this.props.number
    );
  }

  render() {
    return (
      <StyledCell
        size={this.props.size}
        isActive={this.props.isActive}
        data-testid="cell"
      >
        {this.props.number}
      </StyledCell>
    );
  }
}

const StyledCell = styled.div<StyledCellProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${(props) => (props.isActive ? COLORS.activeCellBg : "")};
  color: ${(props) =>
    props.isActive ? COLORS.activeCellColor : COLORS.activeCellBg};
  outline: 1px solid white;
  transition: 0.5s ease background;
  text-align: center;
  line-height: ${(props) => props.size}px;
`;

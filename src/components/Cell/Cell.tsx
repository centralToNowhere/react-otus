import React from "react";
import styled from "@emotion/styled";

export interface ICell {
  x: number;
  y: number;
}

export interface ICellProps {
  size: number;
  isActive: boolean;
  number: number;
}

type StyledCellProps = Omit<ICellProps, "number">;

export class Cell extends React.Component<ICellProps> {
  constructor(props: ICellProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<ICellProps>): boolean {
    if (nextProps.isActive === this.props.isActive) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <StyledCell
        size={this.props.size}
        isActive={this.props.isActive}
        data-testid="cell"
      />
    );
  }
}

const StyledCell = styled.div<StyledCellProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${(props) => (props.isActive ? "black" : "")};
  outline: 1px solid ${(props) => (props.isActive ? "white" : "black")};
`;

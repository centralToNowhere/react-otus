import React from "react";
import styled from "@emotion/styled";
import { Form } from "@/components/Form";
import { Field } from "@/components/Field";
import { ICell } from "@/components/Cell";

export type FieldContainerProps = typeof FieldContainer.defaultProps & {
  cellSize?: number;
  maxFieldWidth?: number;
  maxFieldHeight?: number;
  capacity?: number;
  speed?: number;
};

interface IFieldContainerState {
  cellSize: number;
  maxFieldWidth: number;
  maxFieldHeight: number;
  capacity: number;
  speed: number;
  activeCells: ICell[];
}

export const createFormKey = (): number => {
  return Math.round(Math.random() * 10000);
};

export const getRandomCells = (
  cellsInRow: number,
  cellsInCol: number,
  percentage: number
): ICell[] => {
  return Array.from(Array(cellsInCol)).reduce(
    (allCells, colCells, i): ICell[] => {
      allCells = allCells.concat(
        Array.from(Array(cellsInRow)).reduce((rowCells, cell, j): ICell[] => {
          if (Math.random() < percentage) {
            rowCells.push({
              x: j,
              y: i,
            });
          }
          return rowCells;
        }, [])
      );

      return allCells;
    },
    []
  );
};

export const getGameCycleTimeout = (speed: number): number => {
  return 1000 / speed;
};

export class FieldContainer extends React.Component<
  FieldContainerProps,
  IFieldContainerState
> {
  static defaultProps = {
    cellSize: 30,
    maxFieldWidth: 800,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 1,
  };

  private gameCycleInterval: ReturnType<typeof setInterval> | null;
  private formKey: number;

  constructor(props: FieldContainerProps) {
    super(props);

    this.state = {
      cellSize: props.cellSize,
      maxFieldWidth: props.maxFieldWidth,
      maxFieldHeight: props.maxFieldHeight,
      capacity: props.capacity,
      speed: props.speed,
      activeCells: [],
    };

    this.getCellsInCol = this.getCellsInCol.bind(this);
    this.getCellsInRow = this.getCellsInRow.bind(this);
    this.onCellSizeChange = this.onCellSizeChange.bind(this);
    this.onCapacityChange = this.onCapacityChange.bind(this);
    this.onMaxFieldWidthChange = this.onMaxFieldWidthChange.bind(this);
    this.onMaxFieldHeightChange = this.onMaxFieldHeightChange.bind(this);
    this.onSpeedChange = this.onSpeedChange.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.clearInterval = this.clearInterval.bind(this);

    this.gameCycleInterval = null;
    this.formKey = createFormKey();
  }

  getCellsInRow(): number {
    return Math.floor(this.state.maxFieldWidth / this.state.cellSize);
  }

  getCellsInCol(): number {
    return Math.floor(this.state.maxFieldHeight / this.state.cellSize);
  }

  onCellSizeChange(value: string): void {
    this.setState((prevState: IFieldContainerState) => {
      return {
        ...prevState,
        cellSize: Number(value),
      };
    });
  }

  onCapacityChange(value: string): void {
    this.setState((prevState: IFieldContainerState) => {
      return {
        ...prevState,
        capacity: Number(value),
      };
    });
  }

  onMaxFieldWidthChange(value: string): void {
    this.setState((prevState: IFieldContainerState) => {
      return {
        ...prevState,
        maxFieldWidth: Number(value),
      };
    });
  }

  onMaxFieldHeightChange(value: string): void {
    this.setState((prevState: IFieldContainerState) => {
      return {
        ...prevState,
        maxFieldHeight: Number(value),
      };
    });
  }

  onSpeedChange(value: string): void {
    if (this.gameCycleInterval !== null) {
      this.onStop();
      setTimeout(() => {
        this.onStart();
      }, 0);
    }

    this.setState((prevState: IFieldContainerState) => {
      return {
        ...prevState,
        speed: Number(value),
      };
    });
  }

  onStart(): void {
    if (this.gameCycleInterval === null) {
      this.gameCycleInterval = setInterval(() => {
        const cells = getRandomCells(
          this.getCellsInRow(),
          this.getCellsInCol(),
          this.state.capacity / 100
        );

        this.setState((prevState) => {
          return {
            ...prevState,
            activeCells: cells,
          };
        });
      }, getGameCycleTimeout(this.state.speed));
    }
  }

  onStop(): void {
    this.clearInterval();
  }

  onReset(): void {
    this.onStop();
    this.onCellSizeChange(String(this.props.cellSize));
    this.onSpeedChange(String(this.props.speed));
    this.onMaxFieldWidthChange(String(this.props.maxFieldWidth));
    this.onMaxFieldHeightChange(String(this.props.maxFieldHeight));
    this.onCapacityChange(String(this.props.capacity));

    this.setState((prevState) => {
      return {
        ...prevState,
        activeCells: [],
      };
    });

    // leads to Form unmounting btw; reset fields to initial values
    this.formKey = createFormKey();
  }

  clearInterval(): void {
    if (this.gameCycleInterval !== null) {
      clearInterval(this.gameCycleInterval);
      this.gameCycleInterval = null;
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    const cellsInRow = this.getCellsInRow();
    const cellsInCol = this.getCellsInCol();

    return (
      <Container>
        <Field
          cellSize={this.state.cellSize}
          activeCells={this.state.activeCells}
          cellsInCol={cellsInCol}
          cellsInRow={cellsInRow}
        />
        <Form
          key={this.formKey}
          onCellSizeChange={this.onCellSizeChange}
          onCapacityChange={this.onCapacityChange}
          onMaxFieldWidthChange={this.onMaxFieldWidthChange}
          onMaxFieldHeightChange={this.onMaxFieldHeightChange}
          onSpeedChange={this.onSpeedChange}
          onStart={this.onStart}
          onStop={this.onStop}
          onReset={this.onReset}
          cellSize={this.props.cellSize}
          capacity={this.props.capacity}
          maxFieldWidth={this.props.maxFieldWidth}
          maxFieldHeight={this.props.maxFieldHeight}
          speed={this.props.speed}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

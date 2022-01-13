import React from "react";
import styled from "@emotion/styled";
import { Form } from "@/components/Form";
import { GameField } from "@/components/GameField";
import { ICell } from "@/components/Cell";
import { IPlayer, AppAction } from "@/state";
import {
  ResetGameStateAction,
  SetActiveCellsAction,
  SetCapacityAction,
  SetCellSizeAction,
  SetFieldHeightAction,
  SetFieldWidthAction, SetPlayerAction,
  SetSpeedAction,
} from "@/state/actions";
import { defaultPlayer } from "@/state/AppReducer";
import { PlayerContainer } from "@/components/PlayerContainer";

export type GameFieldContainerProps = {
  cellSize?: number;
  maxFieldWidth?: number;
  maxFieldHeight?: number;
  capacity?: number;
  speed?: number;
  activeCells?: ICell[];
  player?: IPlayer;
  dispatch: React.Dispatch<AppAction>;
};

export type GameFieldContainerDefaultProps =
  typeof GameFieldContainer.defaultProps & {
    cellSize?: number;
    maxFieldWidth?: number;
    maxFieldHeight?: number;
    capacity?: number;
    speed?: number;
    activeCells?: ICell[];
    player: IPlayer;
    dispatch: React.Dispatch<AppAction>;
  };

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

export class GameFieldContainer extends React.Component<GameFieldContainerDefaultProps> {
  static defaultProps = {
    cellSize: 30,
    maxFieldWidth: 800,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 1,
    player: defaultPlayer,
    activeCells: [] as ICell[],
  };

  private gameCycleInterval: ReturnType<typeof setInterval> | null;
  private formKey: number;

  constructor(props: GameFieldContainerDefaultProps) {
    super(props);

    this.gameCycleInterval = null;
    this.formKey = createFormKey();
  }

  getCellsInRow = (): number => {
    return Math.floor(this.props.maxFieldWidth / this.props.cellSize);
  };

  getCellsInCol = (): number => {
    return Math.floor(this.props.maxFieldHeight / this.props.cellSize);
  };

  onCellSizeChange = (value: string): void => {
    this.props.dispatch(SetCellSizeAction(Number(value)));
  };

  onCapacityChange = (value: string): void => {
    this.props.dispatch(SetCapacityAction(Number(value)));
  };

  onMaxFieldWidthChange = (value: string): void => {
    this.props.dispatch(SetFieldWidthAction(Number(value)));
  };

  onMaxFieldHeightChange = (value: string): void => {
    this.props.dispatch(SetFieldHeightAction(Number(value)));
  };

  onSpeedChange = (value: string): void => {
    if (this.gameCycleInterval !== null) {
      this.onStop();
      setTimeout(() => {
        this.onStart();
      }, 0);
    }

    this.props.dispatch(SetSpeedAction(Number(value)));
  };

  setRandomCells = (): void => {
    const cells = getRandomCells(
      this.getCellsInRow(),
      this.getCellsInCol(),
      this.props.capacity / 100
    );

    this.props.dispatch(SetActiveCellsAction(cells));
  };

  onStart = (): void => {
    if (this.gameCycleInterval === null) {
      this.gameCycleInterval = setInterval(
        this.setRandomCells,
        getGameCycleTimeout(this.props.speed)
      );
    }
  };

  onStop = (): void => {
    this.clearInterval();
  };

  onReset = (): void => {
    this.onStop();
    this.props.dispatch(ResetGameStateAction());

    // leads to Form unmounting btw; reset fields to initial values
    this.formKey = createFormKey();
  };

  clearInterval = (): void => {
    if (this.gameCycleInterval !== null) {
      clearInterval(this.gameCycleInterval);
      this.gameCycleInterval = null;
    }
  };

  componentDidMount() {
    this.setRandomCells();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    const cellsInRow = this.getCellsInRow();
    const cellsInCol = this.getCellsInCol();

    return (
      <Container>
        <GameField
          cellSize={this.props.cellSize}
          activeCells={this.props.activeCells}
          cellsInCol={cellsInCol}
          cellsInRow={cellsInRow}
        />
        <ControlContainer>
          <PlayerContainer player={this.props.player} dispatch={this.props.dispatch}/>
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
        </ControlContainer>
      </Container>
  );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

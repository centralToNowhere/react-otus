import React from "react";
import styled from "@emotion/styled";
import { Form } from "@/components/Form";
import { GameField } from "@/components/GameField";
import { ICell } from "@/components/Cell";
import { AppAction } from "@/state";
import {
  IPlayer,
  ResetGameStateAction,
  SetActiveCellsAction,
  SetCapacityAction,
  SetCellSizeAction,
  SetFieldHeightAction,
  SetFieldWidthAction,
  SetPlayerAction,
  SetSpeedAction,
} from "@/state/actions";
import { defaultPlayer } from "@/state/AppReducer";
import { PlayerContainer } from "@/components/PlayerContainer";
import {
  getCellsInCol,
  getCellsInRow,
  getRandomCells,
} from "@/utils/CellGenerator";

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

  onPlayerUnregister = (): void => {
    this.props.dispatch(SetPlayerAction(defaultPlayer));
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

  setActiveCells = (cells: ICell[]): void => {
    this.props.dispatch(SetActiveCellsAction(cells));
  };

  onStart = (): void => {
    if (this.gameCycleInterval === null) {
      this.gameCycleInterval = setInterval(() => {
        const cells = getRandomCells(
          getCellsInRow(this.props.maxFieldWidth, this.props.cellSize),
          getCellsInCol(this.props.maxFieldHeight, this.props.cellSize),
          this.props.capacity / 100
        );

        this.setActiveCells(cells);
      }, getGameCycleTimeout(this.props.speed));
    }
  };

  onStop = (): void => {
    this.clearInterval();
  };

  onReset = (): void => {
    this.onStop();
    this.props.dispatch(ResetGameStateAction());

    // leads to PlayerRegistrationForm unmounting btw; reset fields to initial values
    this.formKey = createFormKey();
  };

  clearInterval = (): void => {
    if (this.gameCycleInterval !== null) {
      clearInterval(this.gameCycleInterval);
      this.gameCycleInterval = null;
    }
  };

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    const cellsInRow = getCellsInRow(
      this.props.maxFieldWidth,
      this.props.cellSize
    );
    const cellsInCol = getCellsInCol(
      this.props.maxFieldHeight,
      this.props.cellSize
    );

    return (
      <Container>
        <GameField
          cellSize={this.props.cellSize}
          activeCells={this.props.activeCells}
          cellsInCol={cellsInCol}
          cellsInRow={cellsInRow}
        />
        <ControlContainer>
          <PlayerContainer
            player={this.props.player}
            onPlayerUnregister={this.onPlayerUnregister}
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

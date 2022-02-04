import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { RootState } from "@/store/redux/store";
import styled from "@emotion/styled";
import { BREAKPOINTS } from "@/styles/ui-styled";
import { Form } from "@/components/Form";
import { GameField, setActiveCells, resetCells } from "@/components/GameField";
import { ICell } from "@/components/Cell";
import { PlayerContainer } from "@/components/PlayerContainer";
import {
  getCellsInCol,
  getCellsInRow,
  getRandomCells,
} from "@/utils/CellGenerator";
import {
  setCellSize,
  setMaxFieldWidth,
  setMaxFieldHeight,
  setCapacity,
  setSpeed,
  resetFieldControls,
} from "@/components/Fields";
import { logout } from "@/auth";
import { ThunkDispatch } from "redux-thunk";

export const createFormKey = (): number => {
  return Math.round(Math.random() * 10000);
};

export const getGameCycleTimeout = (speed: number): number => {
  return 1000 / speed;
};

const mapStateToProps = (state: RootState) => {
  return {
    cellSize: state.fieldControl.cellSize,
    maxFieldWidth: state.fieldControl.maxFieldWidth,
    maxFieldHeight: state.fieldControl.maxFieldHeight,
    capacity: state.fieldControl.capacity,
    speed: state.fieldControl.speed,
    activeCells: state.gameField.activeCells,
    player: state.auth.player,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    setActiveCells: (cells: ICell[]) => {
      dispatch(setActiveCells(cells));
    },
    resetCells: () => {
      dispatch(resetCells());
    },
    setCellSize: (cellSize: string) => {
      dispatch(setCellSize(Number(cellSize)));
    },
    setMaxFieldHeight: (fieldHeight: string) => {
      dispatch(setMaxFieldHeight(Number(fieldHeight)));
    },
    setMaxFieldWidth: (fieldWidth: string) => {
      dispatch(setMaxFieldWidth(Number(fieldWidth)));
    },
    setCapacity: (capacity: string) => {
      dispatch(setCapacity(Number(capacity)));
    },
    setSpeed: (speed: string) => {
      dispatch(setSpeed(Number(speed)));
    },
    resetFieldControls: () => {
      dispatch(resetFieldControls());
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type GameFieldContainerProps = ConnectedProps<typeof connector>;

export class Main extends React.Component<GameFieldContainerProps> {
  private gameCycleInterval: ReturnType<typeof setInterval> | null;
  private formKey: number;

  constructor(props: GameFieldContainerProps) {
    super(props);

    this.gameCycleInterval = null;
    this.formKey = createFormKey();
  }

  onSpeedChange = (value: string): void => {
    if (this.gameCycleInterval !== null) {
      this.onStop();
      setTimeout(() => {
        this.onStart();
      }, 0);
    }

    this.props.setSpeed(value);
  };

  onPlayerUnregister = () => {
    this.props.logout();
    this.props.resetFieldControls();
  };

  onStart = (): void => {
    if (this.gameCycleInterval === null) {
      this.gameCycleInterval = setInterval(() => {
        const cells = getRandomCells(
          getCellsInRow(this.props.maxFieldWidth, this.props.cellSize),
          getCellsInCol(this.props.maxFieldHeight, this.props.cellSize),
          this.props.capacity / 100
        );

        this.props.setActiveCells(cells);
      }, getGameCycleTimeout(this.props.speed));
    }
  };

  onStop = (): void => {
    this.clearInterval();
  };

  onReset = (): void => {
    this.onStop();
    this.props.resetCells();
    this.props.resetFieldControls();
    // form unmounting to set fields with initial values from store
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
    return (
      <Container>
        <GameField />
        <ControlContainer>
          <Form
            key={this.formKey}
            onCellSizeChange={this.props.setCellSize}
            onCapacityChange={this.props.setCapacity}
            onMaxFieldWidthChange={this.props.setMaxFieldWidth}
            onMaxFieldHeightChange={this.props.setMaxFieldHeight}
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
          <PlayerContainer
            player={this.props.player}
            onPlayerUnregister={this.onPlayerUnregister}
          />
        </ControlContainer>
      </Container>
    );
  }
}

export const GameFieldContainer = connector(Main);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlContainer = styled.div`
  position: relative;

  .game-settings-form {
    clear: right;
    float: none;
    max-width: 480px;
  }

  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    width: 100%;
    .game-settings-form {
      margin: 20px auto;
    }

    .player-container {
      position: absolute;
      margin: 20px;
      top: 0;
      left: 0;
    }
  }

  @media screen and (max-width: ${BREAKPOINTS.xl}) and (min-width: ${BREAKPOINTS.md}) {
    .game-settings-form {
      float: right;
    }
  }
`;

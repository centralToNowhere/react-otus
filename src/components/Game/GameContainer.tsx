import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { RootState } from "@/store/redux/store";
import { Game } from "@/components/Game";
import { setActiveCells, resetCells } from "@/components/GameField";
import { ICell } from "@/components/Cell";
import {
  getCellsInCol,
  getCellsInRow,
  getRandomCells,
} from "@/utils/CellGenerator";
import { setSpeed, resetFieldControls } from "@/components/Fields";

export const getGameCycleTimeout = (speed: number): number => {
  return 1000 / speed;
};

export const createFormKey = (): number => {
  return Math.round(Math.random() * 10000);
};

const mapStateToProps = (state: RootState) => {
  return {
    cellSize: state.fieldControl.cellSize,
    maxFieldWidth: state.fieldControl.maxFieldWidth,
    maxFieldHeight: state.fieldControl.maxFieldHeight,
    capacity: state.fieldControl.capacity,
    speed: state.fieldControl.speed,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    setActiveCells: (cells: ICell[]) => {
      dispatch(setActiveCells(cells));
    },
    resetCells: () => {
      dispatch(resetCells());
    },
    resetFieldControls: () => {
      dispatch(resetFieldControls());
    },
    setSpeed: (value: string) => {
      dispatch(setSpeed(Number(value)));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type GameContainerProps = ConnectedProps<typeof connector>;

class Main extends React.Component<GameContainerProps> {
  private gameCycleInterval: ReturnType<typeof setInterval> | null;
  private formKey: number;

  constructor(props: GameContainerProps) {
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
      <Game
        formKey={this.formKey}
        onSpeedChange={this.onSpeedChange}
        onStart={this.onStart}
        onStop={this.onStop}
        onReset={this.onReset}
      />
    );
  }
}

export const GameContainer = connector(Main);

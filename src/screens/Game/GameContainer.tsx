import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { RootState } from "@/store/redux/store";
import { Game } from "@/screens/Game";
import {
  setActiveCells,
  resetCells,
  selectIndexedCells,
} from "@/components/GameField";
import { ICell } from "@/Cell/Cell";
import { getNextGeneration, getRandomCells } from "@/utils/CellGenerator";
import {
  setSpeed,
  resetFieldControls,
  selectCellsInRow,
  selectCellsInCol,
} from "@/components/Fields";
import { startGame, stopGame } from "@/components/GameField";

export const getGameCycleTimeout = (speed: number): number => {
  return 1000 / speed;
};

export const createFormKey = (): number => {
  return Math.round(Math.random() * 10000);
};

const mapStateToProps = (state: RootState) => {
  return {
    cellsInRow: selectCellsInRow(state),
    cellsInCol: selectCellsInCol(state),
    capacity: state.fieldControl.capacity,
    speed: state.fieldControl.speed,
    indexedCells: selectIndexedCells(state),
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
    startGame: () => {
      dispatch(startGame());
    },
    stopGame: () => {
      dispatch(stopGame());
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type GameContainerProps = ConnectedProps<typeof connector>;

class Main extends React.Component<GameContainerProps> {
  private gameCycleInterval: ReturnType<typeof setInterval> | null;
  private formKey: number;
  private rafTimeout: number | null;

  constructor(props: GameContainerProps) {
    super(props);

    this.gameCycleInterval = null;
    this.formKey = createFormKey();
    this.rafTimeout = null;
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
      this.props.startGame();
      this.gameCycleInterval = setInterval(() => {
        this.rafTimeout = requestAnimationFrame(() => {
          const cells = getNextGeneration(
            this.props.cellsInRow,
            this.props.cellsInCol,
            this.props.indexedCells
          );

          this.props.setActiveCells(cells);
        });
      }, getGameCycleTimeout(this.props.speed));
    }
  };

  onStop = (): void => {
    this.props.stopGame();
    this.clear();
  };

  onReset = (): void => {
    this.onStop();
    this.props.resetCells();
    this.props.resetFieldControls();
    this.formKey = createFormKey();
  };

  onGenerateRandom = (): void => {
    const cells = getRandomCells(
      this.props.cellsInRow,
      this.props.cellsInCol,
      this.props.capacity / 100
    );

    this.props.setActiveCells(cells);
  };

  onButtonClickFn = (e: React.SyntheticEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;

    switch (target.getAttribute("name")) {
      case "startButton":
        this.onStart();
        break;
      case "stopButton":
        this.onStop();
        break;
      case "resetButton":
        this.onReset();
        break;
      case "generateRandomButton":
        this.onGenerateRandom();
        break;
    }
  };

  clear = (): void => {
    if (this.gameCycleInterval !== null) {
      clearInterval(this.gameCycleInterval);
      this.gameCycleInterval = null;
    }
    if (this.rafTimeout) {
      cancelAnimationFrame(this.rafTimeout);
    }
  };

  componentWillUnmount() {
    this.onStop();
  }

  render() {
    return (
      <Game
        formKey={this.formKey}
        onSpeedChange={this.onSpeedChange}
        onButtonClickFn={this.onButtonClickFn}
      />
    );
  }
}

export const GameContainer = connector(Main);

import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { Game } from "@/screens/Game";
import { resetCells } from "@/components/GameField";
import { resetFieldControls } from "@/components/Fields";
import { startGame, stopGame, generateRandom } from "@/components/GameField";

export const createFormKey = (): number => {
  return Math.round(Math.random() * 10000);
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    resetCells: () => {
      dispatch(resetCells());
    },
    resetFieldControls: () => {
      dispatch(resetFieldControls());
    },
    startGame: () => {
      dispatch(startGame());
    },
    stopGame: () => {
      dispatch(stopGame());
    },
    generateRandom: () => {
      dispatch(generateRandom());
    },
  };
};

const connector = connect(null, mapDispatchToProps);
export type GameContainerProps = ConnectedProps<typeof connector>;
type GameContainerState = {
  formKey: number;
};

class Main extends React.Component<GameContainerProps, GameContainerState> {
  constructor(props: GameContainerProps) {
    super(props);

    this.state = {
      formKey: createFormKey(),
    };
  }

  onGenerateRandom = (): void => {
    this.props.generateRandom();
  };

  onButtonClickFn = (e: React.SyntheticEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget as HTMLButtonElement;

    switch (target.getAttribute("name")) {
      case "startButton":
        this.props.startGame();
        break;
      case "stopButton":
        this.props.stopGame();
        break;
      case "resetButton":
        this.props.resetCells();
        this.props.resetFieldControls();
        this.setState({
          formKey: createFormKey(),
        });
        break;
      case "generateRandomButton":
        this.props.generateRandom();
        break;
    }
  };

  render() {
    return (
      <Game
        formKey={this.state.formKey}
        onButtonClickFn={this.onButtonClickFn}
      />
    );
  }
}

export const GameContainer = connector(Main);

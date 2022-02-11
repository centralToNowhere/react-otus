import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";
import {
  setCellSize,
  setMaxFieldWidth,
  setMaxFieldHeight,
  setCapacity,
} from "@/components/Fields";
import { Form } from "@/components/Form";
import { RootState } from "@/store/redux/store";

export type ControlCallback<T = void> = (value: T) => void;
export type Callback<E, T> = (e: E) => T;
export type FormOwnProps = {
  onSpeedChange?: ControlCallback<string>;
  onButtonClickFn?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
};

export interface IFieldProps {
  value: string;
  onChange: Callback<string, void>;
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: Callback<React.SyntheticEvent<HTMLButtonElement>, void>;
  content: string;
  disabled?: boolean;
}

const mapStateToProps = (state: RootState) => {
  const { fieldControl, gameField } = state;

  return {
    maxFieldWidth: fieldControl.maxFieldWidth,
    maxFieldHeight: fieldControl.maxFieldHeight,
    capacity: fieldControl.capacity,
    speed: fieldControl.speed,
    cellSize: fieldControl.cellSize,
    gameInProgress: gameField.gameInProgress,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setCellSize: (value: string) => {
    dispatch(setCellSize(Number(value)));
  },
  setMaxFieldWidth: (value: string) => {
    dispatch(setMaxFieldWidth(Number(value)));
  },
  setMaxFieldHeight: (value: string) => {
    dispatch(setMaxFieldHeight(Number(value)));
  },
  setCapacity: (value: string) => {
    dispatch(setCapacity(Number(value)));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type FormContainerProps = ConnectedProps<typeof connector> &
  FormOwnProps;

class Main extends React.Component<FormContainerProps> {
  static inputDelay = 1000;

  constructor(props: FormContainerProps) {
    super(props);
  }

  render() {
    const {
      onSpeedChange = () => {
        /** empty **/
      },
      onButtonClickFn = () => {
        /** empty **/
      },
    } = this.props;

    return (
      <Form
        maxFieldWidth={this.props.maxFieldWidth}
        maxFieldHeight={this.props.maxFieldHeight}
        capacity={this.props.capacity}
        speed={this.props.speed}
        cellSize={this.props.cellSize}
        setCellSize={this.props.setCellSize}
        setMaxFieldWidth={this.props.setMaxFieldWidth}
        setMaxFieldHeight={this.props.setMaxFieldHeight}
        setCapacity={this.props.setCapacity}
        onSpeedChange={onSpeedChange}
        onButtonClickFn={onButtonClickFn}
        gameInProgress={this.props.gameInProgress}
      />
    );
  }
}

export const FormContainer = connector(Main);

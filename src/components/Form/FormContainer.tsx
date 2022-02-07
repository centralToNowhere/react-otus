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
  onStart?: ControlCallback;
  onStop?: ControlCallback;
  onReset?: ControlCallback;
};

export interface IFieldProps {
  value: string;
  onChange: Callback<string, void>;
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: Callback<React.MouseEvent<HTMLButtonElement>, void>;
  content: string;
}

const mapStateToProps = (state: RootState) => {
  const { fieldControl } = state;

  return {
    maxFieldWidth: fieldControl.maxFieldWidth,
    maxFieldHeight: fieldControl.maxFieldHeight,
    capacity: fieldControl.capacity,
    speed: fieldControl.speed,
    cellSize: fieldControl.cellSize,
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

  onButtonClickFn = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;
    const {
      onReset = () => {
        //empty
      },
      onStart = () => {
        //empty
      },
      onStop = () => {
        //empty
      },
    } = this.props;

    switch (target.getAttribute("name")) {
      case "startButton":
        onStart();
        break;
      case "stopButton":
        onStop();
        break;
      case "resetButton":
        onReset();
        break;
    }
  };

  render() {
    const {
      onSpeedChange = () => {
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
        onButtonClickFn={this.onButtonClickFn}
      />
    );
  }
}

export const FormContainer = connector(Main);

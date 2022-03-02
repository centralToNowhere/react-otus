import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";
import {
  setCellSize,
  setMaxFieldWidth,
  setMaxFieldHeight,
  setCapacity,
  setSpeed,
  FieldMaxWidth,
  FieldMaxHeight,
  FieldCellSize,
  FieldCapacity,
  FieldSpeed,
} from "@/components/Fields";
import { Form } from "@/components/Form";
import { RootState } from "@/store/redux/store";
import { ButtonGameControl } from "@/components/Buttons";
import { l10n } from "@/l10n/ru";
import {
  isAtLeastOneCellDisplayed,
  isValidCellsAmountMax,
  isValidCellSizeString,
  isValidNonNegativeNumericString,
} from "@/utils";

export type Callback<E, T> = (e: E) => T;
export type FormOwnProps = {
  onButtonClickFn?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
};

export interface IFieldProps<T> {
  formRawData: {
    [Property in keyof T]: T[Property];
  };
  formValidator?: () => boolean;
  onRawChange: Callback<string, void>;
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
  setSpeed: (value: string) => {
    dispatch(setSpeed(Number(value)));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type FormContainerProps = ConnectedProps<typeof connector> &
  FormOwnProps;

type FormContainerState = {
  rawMaxWidth: string;
  rawMaxHeight: string;
  rawCellSize: string;
  rawSpeed: string;
  rawCapacity: string;
};

class Main extends React.Component<FormContainerProps, FormContainerState> {
  static inputDelay = 1000;

  constructor(props: FormContainerProps) {
    super(props);

    this.state = {
      rawMaxWidth: String(this.props.maxFieldWidth),
      rawMaxHeight: String(this.props.maxFieldHeight),
      rawCellSize: String(this.props.cellSize),
      rawSpeed: String(this.props.speed),
      rawCapacity: String(this.props.capacity),
    };
  }

  setRawData(property: keyof FormContainerState, value: string) {
    this.setState((prevState) => {
      return {
        ...prevState,
        [property]: value,
      };
    });
  }

  setRawMaxWidth = (value: string) => {
    this.setRawData("rawMaxWidth", value);
  };

  setRawMaxHeight = (value: string) => {
    this.setRawData("rawMaxHeight", value);
  };

  setRawCellSize = (value: string) => {
    this.setRawData("rawCellSize", value);
  };

  setRawSpeed = (value: string) => {
    this.setRawData("rawSpeed", value);
  };

  setRawCapacity = (value: string) => {
    this.setRawData("rawCapacity", value);
  };

  getErrorMessage() {
    const cellsMax = isValidCellsAmountMax(
      Number(this.state.rawCellSize),
      Number(this.state.rawMaxWidth),
      Number(this.state.rawMaxHeight)
    );

    const cellsMin = isAtLeastOneCellDisplayed(
      Number(this.state.rawCellSize),
      Number(this.state.rawMaxWidth),
      Number(this.state.rawMaxHeight)
    );

    return cellsMax !== true ? cellsMax : cellsMin !== true ? cellsMin : "";
  }

  getFormError() {
    const msg = this.getErrorMessage();

    return msg ? <p>{msg}</p> : null;
  }

  onChangeRelatedFields = () => {
    this.props.setMaxFieldWidth(this.state.rawMaxWidth);
    this.props.setMaxFieldHeight(this.state.rawMaxHeight);
    this.props.setCellSize(this.state.rawCellSize);
  };

  cellsAmountValidator = () => {
    const cellSize = this.state.rawCellSize;
    const maxHeight = this.state.rawMaxHeight;
    const maxWidth = this.state.rawMaxWidth;

    return (
      isValidNonNegativeNumericString(maxWidth) === true &&
      isValidNonNegativeNumericString(maxHeight) === true &&
      isValidCellSizeString(cellSize) === true &&
      isValidCellsAmountMax(
        Number(cellSize),
        Number(maxWidth),
        Number(maxHeight)
      ) === true &&
      isAtLeastOneCellDisplayed(
        Number(cellSize),
        Number(maxWidth),
        Number(maxHeight)
      ) === true
    );
  };

  render() {
    const {
      onButtonClickFn = () => {
        /** empty **/
      },
    } = this.props;

    return (
      <Form
        fields={
          <>
            <FieldMaxWidth
              formRawData={{
                rawMaxWidth: this.state.rawMaxWidth,
                rawMaxHeight: this.state.rawMaxHeight,
                rawCellSize: this.state.rawCellSize,
                highlight: Boolean(this.getErrorMessage()),
              }}
              formValidator={this.cellsAmountValidator}
              onRawChange={this.setRawMaxWidth}
              onChange={this.onChangeRelatedFields}
            />
            <FieldMaxHeight
              formRawData={{
                rawMaxWidth: this.state.rawMaxWidth,
                rawMaxHeight: this.state.rawMaxHeight,
                rawCellSize: this.state.rawCellSize,
                highlight: Boolean(this.getErrorMessage()),
              }}
              formValidator={this.cellsAmountValidator}
              onRawChange={this.setRawMaxHeight}
              onChange={this.onChangeRelatedFields}
            />
            <FieldCellSize
              formRawData={{
                rawMaxWidth: this.state.rawMaxWidth,
                rawMaxHeight: this.state.rawMaxHeight,
                rawCellSize: this.state.rawCellSize,
                highlight: Boolean(this.getErrorMessage()),
              }}
              formValidator={this.cellsAmountValidator}
              onRawChange={this.setRawCellSize}
              onChange={this.onChangeRelatedFields}
            />
            <FieldCapacity
              formRawData={{
                rawCapacity: this.state.rawCapacity,
              }}
              onRawChange={this.setRawCapacity}
              onChange={this.props.setCapacity}
            />
            <FieldSpeed
              formRawData={{
                rawSpeed: this.state.rawSpeed,
              }}
              onRawChange={this.setRawSpeed}
              onChange={this.props.setSpeed}
            />
          </>
        }
        buttons={
          <>
            <ButtonGameControl
              type={"button"}
              onClick={onButtonClickFn}
              name={"startButton"}
              content={l10n.buttonStart}
              disabled={this.props.gameInProgress}
            />
            <ButtonGameControl
              type={"button"}
              onClick={onButtonClickFn}
              name={"stopButton"}
              content={l10n.buttonStop}
            />
            <ButtonGameControl
              type={"reset"}
              onClick={onButtonClickFn}
              name={"resetButton"}
              content={l10n.buttonReset}
            />
            <ButtonGameControl
              type={"button"}
              onClick={onButtonClickFn}
              name={"generateRandomButton"}
              content={l10n.buttonGenerateRandom}
            />
          </>
        }
        error={this.getFormError()}
      />
    );
  }
}

export const FormContainer = connector(Main);

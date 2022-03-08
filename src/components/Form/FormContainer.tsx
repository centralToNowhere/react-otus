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
  FieldValidator,
  OnValidateCallback,
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
  isValidPositiveNumericString,
} from "@/utils";
import { IFieldErrorProps } from "@/components/Fields/FieldError";
import { initialErrorProps } from "@/components/Fields/FieldError/FieldError";

export type Callback<E, T> = (e: E) => T;
export type FormOwnProps = {
  onButtonClickFn?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
};

export interface IFieldProps<T> {
  formRawData: {
    [Property in keyof T]: T[Property];
  };
  formValidators: FieldValidator[];
  onRawChange: Callback<string, void>;
  onChange: Callback<string, void>;
  error: IFieldErrorProps;
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
  maxWidthError: IFieldErrorProps;
  maxHeightError: IFieldErrorProps;
  cellSizeError: IFieldErrorProps;
  speedError: IFieldErrorProps;
  capacityError: IFieldErrorProps;
  highlightRelatedFields: boolean;
  errorMessageRelatedFields: string;
};

class Main extends React.Component<FormContainerProps, FormContainerState> {
  static inputDelay = 1000;

  constructor(props: FormContainerProps) {
    super(props);
  }

  state = {
    rawMaxWidth: String(this.props.maxFieldWidth),
    rawMaxHeight: String(this.props.maxFieldHeight),
    rawCellSize: String(this.props.cellSize),
    rawSpeed: String(this.props.speed),
    rawCapacity: String(this.props.capacity),
    maxWidthError: { ...initialErrorProps },
    maxHeightError: { ...initialErrorProps },
    cellSizeError: { ...initialErrorProps },
    speedError: { ...initialErrorProps },
    capacityError: { ...initialErrorProps },
    highlightRelatedFields: false,
    errorMessageRelatedFields: "",
  };

  maxWidthValidators = [
    isValidPositiveNumericString(this.setStateErrorProperty("maxWidthError")),
  ];
  maxHeightValidators = [
    isValidPositiveNumericString(this.setStateErrorProperty("maxHeightError")),
  ];
  cellSizeValidators = [
    isValidCellSizeString(this.setStateErrorProperty("cellSizeError")),
  ];
  speedValidators = [
    isValidPositiveNumericString(this.setStateErrorProperty("speedError")),
  ];
  capacityValidators = [
    isValidNonNegativeNumericString(
      this.setStateErrorProperty("capacityError")
    ),
  ];

  setRawMaxWidth = this.setStateRawProperty("rawMaxWidth");
  setRawMaxHeight = this.setStateRawProperty("rawMaxHeight");
  setRawCellSize = this.setStateRawProperty("rawCellSize");
  setRawCapacity = this.setStateRawProperty("rawCapacity");
  setRawSpeed = this.setStateRawProperty("rawSpeed");

  setStateProperty(
    property: keyof FormContainerState,
    value: string | IFieldErrorProps | boolean
  ) {
    this.setState({
      [property]: value,
    } as Pick<FormContainerState, keyof FormContainerState>);
  }

  setStateErrorProperty(
    property: keyof FormContainerState
  ): OnValidateCallback {
    return (isValid, msg) => {
      this.setStateProperty(property, {
        show: !isValid,
        msg: msg,
      });
    };
  }

  setStateRawProperty(
    property: keyof FormContainerState
  ): (value: string) => void {
    return (value) => {
      this.setStateProperty(property, value);
    };
  }

  getRelatedFieldsErrorMessage = (): string => {
    const maxValidator = isValidCellsAmountMax();
    const minValidator = isAtLeastOneCellDisplayed();

    if (
      !maxValidator.validate(
        Number(this.state.rawCellSize),
        Number(this.state.rawMaxWidth),
        Number(this.state.rawMaxHeight)
      )
    ) {
      return maxValidator.errorMessage;
    }

    if (
      !minValidator.validate(
        Number(this.state.rawCellSize),
        Number(this.state.rawMaxWidth),
        Number(this.state.rawMaxHeight)
      )
    ) {
      return minValidator.errorMessage;
    }

    return "";
  };

  onChangeRelatedFields = () => {
    const errorMessage = this.getRelatedFieldsErrorMessage();

    this.setState({
      highlightRelatedFields: Boolean(errorMessage),
      errorMessageRelatedFields: errorMessage,
    });

    if (!Boolean(errorMessage)) {
      this.props.setMaxFieldWidth(this.state.rawMaxWidth);
      this.props.setMaxFieldHeight(this.state.rawMaxHeight);
      this.props.setCellSize(this.state.rawCellSize);
    }
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
                highlight: this.state.highlightRelatedFields,
              }}
              formValidators={this.maxWidthValidators}
              onRawChange={this.setRawMaxWidth}
              onChange={this.onChangeRelatedFields}
              error={this.state.maxWidthError}
            />
            <FieldMaxHeight
              formRawData={{
                rawMaxWidth: this.state.rawMaxWidth,
                rawMaxHeight: this.state.rawMaxHeight,
                rawCellSize: this.state.rawCellSize,
                highlight: this.state.highlightRelatedFields,
              }}
              formValidators={this.maxHeightValidators}
              onRawChange={this.setRawMaxHeight}
              onChange={this.onChangeRelatedFields}
              error={this.state.maxHeightError}
            />
            <FieldCellSize
              formRawData={{
                rawMaxWidth: this.state.rawMaxWidth,
                rawMaxHeight: this.state.rawMaxHeight,
                rawCellSize: this.state.rawCellSize,
                highlight: this.state.highlightRelatedFields,
              }}
              formValidators={this.cellSizeValidators}
              onRawChange={this.setRawCellSize}
              onChange={this.onChangeRelatedFields}
              error={this.state.cellSizeError}
            />
            <FieldCapacity
              formRawData={{
                rawCapacity: this.state.rawCapacity,
              }}
              formValidators={this.capacityValidators}
              onRawChange={this.setRawCapacity}
              onChange={this.props.setCapacity}
              error={this.state.capacityError}
            />
            <FieldSpeed
              formRawData={{
                rawSpeed: this.state.rawSpeed,
              }}
              formValidators={this.speedValidators}
              onRawChange={this.setRawSpeed}
              onChange={this.props.setSpeed}
              error={this.state.speedError}
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
        error={
          Boolean(this.state.errorMessageRelatedFields) ? (
            <p>{this.state.errorMessageRelatedFields}</p>
          ) : null
        }
      />
    );
  }
}

export const FormContainer = connector(Main);

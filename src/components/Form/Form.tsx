import React from "react";
import styled from "@emotion/styled";
import { minCellSize } from "@/components/Cell";
import { l10n } from "@/l10n/ru";
import { FieldMaxWidth } from "@/components/Fields/MaxWidth/FieldMaxWidth";
import { FieldMaxHeight } from "@/components/Fields/MaxHeight/FieldMaxHeight";
import { FieldCellSize } from "@/components/Fields/CellSize/FieldCellSize";
import { FieldCapacity } from "@/components/Fields/Capacity/FieldCapacity";
import { FieldSpeed } from "@/components/Fields/Speed/FieldSpeed";
import { ButtonGameControl } from "@/components/Buttons/ButtonGameControl";

export type ControlCallback<T = void> = (value: T) => void;
export type Callback<E, T> = (e: E) => T;
export type FormProps = typeof Form.defaultProps & {
  cellSize?: number;
  onCellSizeChange?: ControlCallback<string>;
  maxFieldWidth?: number;
  onMaxFieldWidthChange?: ControlCallback<string>;
  maxFieldHeight?: number;
  onMaxFieldHeightChange?: ControlCallback<string>;
  readonly cellsInRow?: number;
  readonly cellsInCol?: number;
  capacity?: number;
  onCapacityChange?: ControlCallback<string>;
  speed?: number;
  onSpeedChange?: ControlCallback<string>;
  onStart?: ControlCallback;
  onStop?: ControlCallback;
  onReset?: ControlCallback;
};

type InputProperties =
  | "fieldWidth"
  | "fieldHeight"
  | "cellSize"
  | "capacity"
  | "speed";

type InputErrors = {
  [key in InputProperties]: {
    show: boolean;
    msg: string;
  };
};

export interface IFieldProps<T extends keyof InputErrors> {
  value: string;
  onChange: Callback<React.ChangeEvent<HTMLInputElement>, void>;
  onBlur: Callback<React.FocusEvent<HTMLInputElement>, void>;
  error: InputErrors[T];
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: Callback<React.FormEvent<HTMLButtonElement>, void>;
  content: string;
}

interface IFormState {
  cellSizeString: string;
  capacityString: string;
  maxFieldWidthString: string;
  maxFieldHeightString: string;
  speedString: string;
  errors: InputErrors;
}

export const isValidNumericString = (
  inputString: unknown
): inputString is number => {
  return (
    typeof inputString === "string" &&
    inputString !== "" &&
    !isNaN(Number(inputString))
  );
};

const isValidCellSizeString = (cellSizeString: unknown): boolean => {
  return (
    isValidNumericString(cellSizeString) &&
    Number(cellSizeString) >= minCellSize
  );
};

export const isValidPositiveNumericString = (str: unknown): boolean => {
  return isValidNumericString(str) && Number(str) > 0;
};

export const isValidNonNegativeNumericString = (str: unknown): boolean => {
  return isValidNumericString(str) && Number(str) >= 0;
};

export class Form extends React.Component<FormProps, IFormState> {
  static defaultProps = {
    onCellSizeChange: (value: string) => {
      console.log(value);
    },
    onMaxFieldWidthChange: (value: string) => {
      console.log(value);
    },
    onMaxFieldHeightChange: (value: string) => {
      console.log(value);
    },
    onCapacityChange: (value: string) => {
      console.log(value);
    },
    onSpeedChange: (value: string) => {
      console.log(value);
    },
    onStart: () => {
      // do nothing
    },
    onStop: () => {
      // do nothing
    },
    onReset: () => {
      // do nothing
    },
  };

  private timer: ReturnType<typeof setTimeout> | null;
  private formRef: React.RefObject<HTMLFormElement>;

  static inputDelay = 1000;

  constructor(props: FormProps) {
    super(props);

    this.state = {
      cellSizeString: String(this.props.cellSize),
      capacityString: String(this.props.capacity),
      maxFieldWidthString: String(this.props.maxFieldWidth),
      maxFieldHeightString: String(this.props.maxFieldHeight),
      speedString: String(this.props.speed),
      errors: {
        fieldWidth: {
          show: false,
          msg: "Expected non-negative number",
        },
        fieldHeight: {
          show: false,
          msg: "Expected non-negative number",
        },
        capacity: {
          show: false,
          msg: "Expected non-negative number",
        },
        cellSize: {
          show: false,
          msg: "Expected number >= 10",
        },
        speed: {
          show: false,
          msg: "Expected positive number",
        },
      },
    };

    this.formRef = React.createRef();
    this.timer = null;
  }

  validateFieldWidth = (fieldWidthString: unknown): boolean => {
    if (isValidNonNegativeNumericString(fieldWidthString)) {
      this.setErrorState("fieldWidth", false);
      return true;
    }

    this.setErrorState("fieldWidth", true);
    return false;
  };

  validateFieldHeight = (fieldHeightString: unknown): boolean => {
    if (isValidNonNegativeNumericString(fieldHeightString)) {
      this.setErrorState("fieldHeight", false);
      return true;
    }

    this.setErrorState("fieldHeight", true);
    return false;
  };

  validateCapacity = (capacityString: unknown): boolean => {
    if (isValidNonNegativeNumericString(capacityString)) {
      this.setErrorState("capacity", false);
      return true;
    }

    this.setErrorState("cellSize", true);
    return false;
  };

  validateCellSize = (cellSizeString: unknown): boolean => {
    if (isValidCellSizeString(cellSizeString)) {
      this.setErrorState("cellSize", false);
      return true;
    }

    this.setErrorState("cellSize", true);
    return false;
  };

  validateSpeed = (speedString: unknown): boolean => {
    if (isValidPositiveNumericString(speedString)) {
      this.setErrorState("speed", false);

      return true;
    }

    this.setErrorState("speed", true);
    return false;
  };

  setErrorState = (property: keyof InputErrors, show: boolean): void => {
    this.setState((prevState) => {
      return {
        ...prevState,
        errors: {
          ...prevState.errors,
          [property]: {
            ...prevState.errors[property],
            show: show,
          },
        },
      };
    });
  };

  showError = (error: { show: boolean; msg: string }): React.ReactNode => {
    return error.show ? (
      <div className="error-container">
        <p className="error-msg">{error.msg}</p>
      </div>
    ) : null;
  };

  debounce<T>(
    callback: (value: T) => void,
    property: string,
    validator: (value: T) => boolean,
    delay = Form.inputDelay
  ): (value: T) => void {
    return (value) => {
      this.clearTimer();

      this.timer = setTimeout(() => {
        if (validator(value)) {
          callback(value);
          this.setState((prevState) => {
            return {
              ...prevState,
              [property]: Number(value),
            };
          });
        }

        this.timer = null;
      }, delay);
    };
  }

  onChangeFn = (
    onChange: (value: string) => void,
    property: string,
    validator: (value: string) => boolean
  ): Callback<React.ChangeEvent<HTMLInputElement>, void> => {
    const debounced = this.debounce(onChange, property, validator);

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          [property]: e.target.value,
        };
      });
      debounced(e.target.value);
    };
  };

  onButtonClickFn = (
    fn: () => void
  ): Callback<React.FormEvent<HTMLButtonElement>, void> => {
    return (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      fn();
    };
  };

  onBlurFn = (
    onChange: (value: string) => void,
    validator: (value: string) => boolean
  ): Callback<React.FocusEvent<HTMLInputElement>, void> => {
    return (e: React.FocusEvent<HTMLInputElement>) => {
      this.clearTimer();

      if (validator(e.target.value)) {
        onChange(e.target.value);
      }
    };
  };

  clearTimer = () => {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    return (
      <FormElement ref={this.formRef} data-testid={"field-form"}>
        <input autoComplete="off" hidden />
        <FormGroup>
          <FieldMaxWidth
            value={this.state.maxFieldWidthString}
            onChange={this.onChangeFn(
              this.props.onMaxFieldWidthChange,
              "maxFieldWidthString",
              this.validateFieldWidth
            )}
            onBlur={this.onBlurFn(
              this.props.onMaxFieldWidthChange,
              this.validateFieldWidth
            )}
            error={this.state.errors.fieldWidth}
          />

          <FieldMaxHeight
            value={this.state.maxFieldHeightString}
            onChange={this.onChangeFn(
              this.props.onMaxFieldHeightChange,
              "maxFieldHeightString",
              this.validateFieldHeight
            )}
            onBlur={this.onBlurFn(
              this.props.onMaxFieldHeightChange,
              this.validateFieldHeight
            )}
            error={this.state.errors.fieldHeight}
          />

          <FieldCellSize
            value={this.state.cellSizeString}
            onChange={this.onChangeFn(
              this.props.onCellSizeChange,
              "cellSizeString",
              this.validateCellSize
            )}
            onBlur={this.onBlurFn(
              this.props.onCellSizeChange,
              this.validateCellSize
            )}
            error={this.state.errors.cellSize}
          />

          <FieldCapacity
            value={this.state.capacityString}
            onChange={this.onChangeFn(
              this.props.onCapacityChange,
              "capacityString",
              this.validateCapacity
            )}
            onBlur={this.onBlurFn(
              this.props.onCapacityChange,
              this.validateCapacity
            )}
            error={this.state.errors.capacity}
          />

          <FieldSpeed
            value={this.state.speedString}
            onChange={this.onChangeFn(
              this.props.onSpeedChange,
              "speedString",
              this.validateSpeed
            )}
            onBlur={this.onBlurFn(this.props.onSpeedChange, this.validateSpeed)}
            error={this.state.errors.speed}
          />
        </FormGroup>

        <FormGroup>
          <ButtonGameControl
            type={"button"}
            onClick={this.onButtonClickFn(this.props.onStart)}
            name={"startButton"}
            content={l10n.buttonStart}
          />

          <ButtonGameControl
            type={"button"}
            onClick={this.onButtonClickFn(this.props.onStop)}
            name={"stopButton"}
            content={l10n.buttonStop}
          />

          <ButtonGameControl
            type={"reset"}
            onClick={this.onButtonClickFn(this.props.onReset)}
            name={"resetButton"}
            content={l10n.buttonReset}
          />
        </FormGroup>
      </FormElement>
    );
  }
}

const FormElement = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;

  input,
  label,
  button,
  p {
    line-height: 1.2;
    font-size: 1.2em;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 600px;
`;

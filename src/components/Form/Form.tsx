import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { minCellSize } from "@/components/Cell";

type ControlCallback<T = void> = (value: T) => void;
type Callback<E, T> = (e: E) => T;
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

type IInputErrors = {
  [key in InputProperties]: {
    show: boolean;
    msg: string;
  };
};

interface IFormState {
  cellSizeString: string;
  capacityString: string;
  maxFieldWidthString: string;
  maxFieldHeightString: string;
  speedString: string;
  errors: IInputErrors;
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

const floatPattern = "([0-9]*[.])?[0-9]+";
const numberPattern = "[0-9]*";

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

  setErrorState = (property: keyof IInputErrors, show: boolean): void => {
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

  onButtonClickFn = <T,>(
    fn: () => T
  ): Callback<React.FormEvent<HTMLButtonElement>, T> => {
    return (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      return fn();
    };
  };

  onBlurFn = <T,>(
    onChange: (value: string) => T,
    validator: (value: string) => T
  ): Callback<React.FocusEvent<HTMLInputElement>, T | void> => {
    return (e: React.FocusEvent<HTMLInputElement>) => {
      this.clearTimer();

      if (validator(e.target.value)) {
        return onChange(e.target.value);
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
          <FormField>
            <FormLabel htmlFor="field-width">Макс. ширина:</FormLabel>
            <FormInput
              id="field-width"
              type="number"
              pattern={floatPattern}
              step="1"
              name="field-width"
              autoFocus={true}
              value={this.state.maxFieldWidthString}
              autoComplete="off"
              onChange={this.onChangeFn(
                this.props.onMaxFieldWidthChange,
                "maxFieldWidthString",
                this.validateFieldWidth
              )}
              onBlur={this.onBlurFn(
                this.props.onMaxFieldWidthChange,
                this.validateFieldWidth
              )}
            />
            {this.showError(this.state.errors.fieldWidth)}
          </FormField>

          <FormField>
            <FormLabel htmlFor="field-height">Макс. высота:</FormLabel>
            <FormInput
              id="field-height"
              type="number"
              pattern={floatPattern}
              step="1"
              name="field-height"
              value={this.state.maxFieldHeightString}
              autoComplete="off"
              onChange={this.onChangeFn(
                this.props.onMaxFieldHeightChange,
                "maxFieldHeightString",
                this.validateFieldHeight
              )}
              onBlur={this.onBlurFn(
                this.props.onMaxFieldHeightChange,
                this.validateFieldHeight
              )}
            />
            {this.showError(this.state.errors.fieldHeight)}
          </FormField>

          <FormField>
            <FormLabel htmlFor="cell-size-input">Размер ячейки:</FormLabel>
            <FormInput
              id="cell-size-input"
              type="number"
              pattern={numberPattern}
              step="1"
              name="cell-size-input"
              value={this.state.cellSizeString}
              autoComplete="off"
              onChange={this.onChangeFn(
                this.props.onCellSizeChange,
                "cellSizeString",
                this.validateCellSize
              )}
              onBlur={this.onBlurFn(
                this.props.onCellSizeChange,
                this.validateCellSize
              )}
            />
            {this.showError(this.state.errors.cellSize)}
          </FormField>

          <FormField>
            <FormLabel htmlFor="capacity-percentage">
              Процент заполненности:
            </FormLabel>
            <p>{this.state.capacityString} %</p>
            <FormInput
              id="capacity-percentage"
              type="range"
              max="100"
              min="0"
              step="1"
              name="capacity-percentage"
              value={this.state.capacityString}
              autoComplete="off"
              onChange={this.onChangeFn(
                this.props.onCapacityChange,
                "capacityString",
                this.validateCapacity
              )}
              onBlur={this.onBlurFn(
                this.props.onCapacityChange,
                this.validateCapacity
              )}
            />
            {this.showError(this.state.errors.capacity)}
          </FormField>

          <FormField>
            <FormLabel htmlFor="speed-change">Обновлений в секунду:</FormLabel>
            <FormInput
              id="speed-change"
              type="number"
              pattern={floatPattern}
              step="0.1"
              name="speed-change"
              value={this.state.speedString}
              autoComplete="off"
              onChange={this.onChangeFn(
                this.props.onSpeedChange,
                "speedString",
                this.validateSpeed
              )}
              onBlur={this.onBlurFn(
                this.props.onSpeedChange,
                this.validateSpeed
              )}
            />
            {this.showError(this.state.errors.speed)}
          </FormField>
        </FormGroup>

        <FormGroup>
          <FormField>
            <FormButtonContainer>
              <FormButton
                type="button"
                onClick={this.onButtonClickFn(this.props.onStart)}
                name="start-button"
              >
                Старт
              </FormButton>
            </FormButtonContainer>
          </FormField>

          <FormField>
            <FormButtonContainer>
              <FormButton
                type="button"
                onClick={this.onButtonClickFn(this.props.onStop)}
                name="stop-button"
              >
                Стоп
              </FormButton>
            </FormButtonContainer>
          </FormField>

          <FormField>
            <FormButtonContainer>
              <FormButton
                type="reset"
                onClick={this.onButtonClickFn(this.props.onReset)}
                name="reset-button"
              >
                Сброс
              </FormButton>
            </FormButtonContainer>
          </FormField>
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

const FormField = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 0 0 calc(100% / 3 - 40px);
  margin: 20px;
  justify-content: end;

  input,
  button {
    margin: 5px 0 0 0;
    min-width: 100px;
  }

  div.error-container {
    position: relative;
  }

  p.error-msg {
    position: absolute;
    line-height: 1em;
    font-size: 1em;
    color: red;
  }
`;

const FormLabel = styled.label`
  display: inline;
`;

const FormInput = styled.input`
  background: inherit;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  display: block;
  outline: 0;
  width: 100px;

  &:focus {
    border-bottom: 2px solid ${COLORS.accent};
  }
`;

const FormButtonContainer = styled.div`
  display: inline-block;
`;

const FormButton = styled.button`
  background: inherit;

  &:focus {
    outline: 2px solid ${COLORS.accent};
    border: 2px solid transparent;
  }
`;

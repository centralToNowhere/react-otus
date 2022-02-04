import React from "react";
import styled from "@emotion/styled";
import { l10n } from "@/l10n/ru";
import { FieldMaxWidth } from "@/components/Fields/MaxWidth/FieldMaxWidth";
import { FieldMaxHeight } from "@/components/Fields/MaxHeight/FieldMaxHeight";
import { FieldCellSize } from "@/components/Fields/CellSize/FieldCellSize";
import { FieldCapacity } from "@/components/Fields/Capacity/FieldCapacity";
import { FieldSpeed } from "@/components/Fields/Speed/FieldSpeed";
import { ButtonGameControl } from "@/components/Buttons/ButtonGameControl";
import { FormElement } from "@/components/Form";

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

export interface IFieldProps {
  value: string;
  onChange: Callback<string, void>;
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: Callback<React.MouseEvent<HTMLButtonElement>, void>;
  content: string;
}

export class Form extends React.Component<FormProps> {
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

  private formRef: React.RefObject<HTMLFormElement>;

  static inputDelay = 1000;

  constructor(props: FormProps) {
    super(props);

    this.formRef = React.createRef();
  }

  onButtonClickFn = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;

    switch (target.getAttribute("name")) {
      case "startButton":
        this.props.onStart();
        break;
      case "stopButton":
        this.props.onStop();
        break;
      case "resetButton":
        this.props.onReset();
        break;
    }
  };

  render() {
    return (
      <FormElement
        className="game-settings-form"
        ref={this.formRef}
        data-testid={"field-form"}
      >
        <input autoComplete="off" hidden />
        <FormGroup>
          <FieldMaxWidth
            value={String(this.props.maxFieldWidth)}
            onChange={this.props.onMaxFieldWidthChange}
          />

          <FieldMaxHeight
            value={String(this.props.maxFieldHeight)}
            onChange={this.props.onMaxFieldHeightChange}
          />

          <FieldCellSize
            value={String(this.props.cellSize)}
            onChange={this.props.onCellSizeChange}
          />

          <FieldCapacity
            value={String(this.props.capacity)}
            onChange={this.props.onCapacityChange}
          />

          <FieldSpeed
            value={String(this.props.speed)}
            onChange={this.props.onSpeedChange}
          />
        </FormGroup>

        <FormGroup>
          <ButtonGameControl
            type={"button"}
            onClick={this.onButtonClickFn}
            name={"startButton"}
            content={l10n.buttonStart}
          />

          <ButtonGameControl
            type={"button"}
            onClick={this.onButtonClickFn}
            name={"stopButton"}
            content={l10n.buttonStop}
          />

          <ButtonGameControl
            type={"reset"}
            onClick={this.onButtonClickFn}
            name={"resetButton"}
            content={l10n.buttonReset}
          />
        </FormGroup>
      </FormElement>
    );
  }
}

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

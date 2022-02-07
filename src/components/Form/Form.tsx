import React from "react";
import { FormElement } from "@/components/Form/FormElement";
import { FormGroup } from "@/components/Form/FormGroup";
import {
  FieldCapacity,
  FieldCellSize,
  FieldMaxHeight,
  FieldMaxWidth,
  FieldSpeed,
} from "@/components/Fields";
import { ButtonGameControl } from "@/components/Buttons";
import { l10n } from "@/l10n/ru";

export interface IFormProps {
  maxFieldWidth: number;
  maxFieldHeight: number;
  capacity: number;
  speed: number;
  cellSize: number;
  setCellSize: (value: string) => void;
  setMaxFieldWidth: (value: string) => void;
  setMaxFieldHeight: (value: string) => void;
  setCapacity: (value: string) => void;
  onSpeedChange: (value: string) => void;
  onButtonClickFn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Form extends React.Component<IFormProps> {
  constructor(props: IFormProps) {
    super(props);
  }

  render() {
    return (
      <FormElement className="game-settings-form" data-testid={"field-form"}>
        <input autoComplete="off" hidden />
        <FormGroup>
          <FieldMaxWidth
            value={String(this.props.maxFieldWidth)}
            onChange={this.props.setMaxFieldWidth}
          />

          <FieldMaxHeight
            value={String(this.props.maxFieldHeight)}
            onChange={this.props.setMaxFieldHeight}
          />

          <FieldCellSize
            value={String(this.props.cellSize)}
            onChange={this.props.setCellSize}
          />

          <FieldCapacity
            value={String(this.props.capacity)}
            onChange={this.props.setCapacity}
          />

          <FieldSpeed
            value={String(this.props.speed)}
            onChange={this.props.onSpeedChange}
          />
        </FormGroup>

        <FormGroup>
          <ButtonGameControl
            type={"button"}
            onClick={this.props.onButtonClickFn}
            name={"startButton"}
            content={l10n.buttonStart}
          />

          <ButtonGameControl
            type={"button"}
            onClick={this.props.onButtonClickFn}
            name={"stopButton"}
            content={l10n.buttonStop}
          />

          <ButtonGameControl
            type={"reset"}
            onClick={this.props.onButtonClickFn}
            name={"resetButton"}
            content={l10n.buttonReset}
          />
        </FormGroup>
      </FormElement>
    );
  }
}

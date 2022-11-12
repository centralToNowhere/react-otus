import React from "react";
import { FormElement } from "@/components/Form/FormElement";
import { FormGroup, FormGroupButtons } from "@/components/Form/FormGroup";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { FormError } from "@/components/Form/FormError";

export interface IFormProps {
  fields: ReactJSXElement;
  buttons: ReactJSXElement;
  error: ReactJSXElement | null;
}

export class Form extends React.Component<IFormProps> {
  constructor(props: IFormProps) {
    super(props);
  }

  render() {
    return (
      <FormElement className="game-settings-form" data-testid={"field-form"}>
        <input autoComplete="off" hidden />
        {this.props.error && <FormError>{this.props.error}</FormError>}
        <FormGroup>{this.props.fields}</FormGroup>
        <FormGroupButtons>{this.props.buttons}</FormGroupButtons>
      </FormElement>
    );
  }
}

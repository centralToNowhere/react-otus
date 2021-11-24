import React from "react";
import styled from "@emotion/styled";

export interface IFormProps {
  inputString: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type PossibleInputCharacter =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0";

export const isPossibleInput = (inputString: string): boolean => {
  return inputString
    .split("")
    .every((char: string) => isPossibleInputCharacter(char));
};

export const isPossibleInputCharacter = (
  char: string
): char is PossibleInputCharacter => {
  return typeof char === "string" && /^[0-9]$/.test(char);
};

export class Form extends React.Component<IFormProps> {
  render() {
    return (
      <FormElement data-testid={"interactive-number-drawing-form"}>
        <FormLabel htmlFor="number-input">Введите целое число:</FormLabel>
        <FormInput
          id="number-input"
          type="text"
          name="number-input"
          value={this.props.inputString}
          onChange={this.props.onChange}
          autoFocus={true}
        />
      </FormElement>
    );
  }
}

const FormElement = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input,
  label {
    line-height: 2;
    font-size: 2em;
  }

  input {
    background: inherit;
    width: 100%;
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px solid #ff215c;
  }
`;

const FormLabel = styled.label``;

const FormInput = styled.input``;

import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

interface IInputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  highlight?: boolean;
}

export const InputField = styled.input<IInputFieldProps>`
  background: inherit;
  border: ${(props) => (props.highlight ? "2px solid" : 0)};
  border-bottom: 2px solid;
  border-color: ${(props) => (props.highlight ? "red" : COLORS.border)};
  display: block;
  outline: 0;
  width: 100px;

  &:focus {
    border-bottom: 2px solid ${COLORS.accent};
  }
`;

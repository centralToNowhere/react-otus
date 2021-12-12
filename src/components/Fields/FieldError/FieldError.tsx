import React from "react";
import styled from "@emotion/styled";

export interface IFieldErrorProps {
  show: boolean;
  msg: string;
}

export const FieldError: React.FC<IFieldErrorProps> = ({
  show = false,
  msg = "",
}: IFieldErrorProps) => {
  return (
    <>
      {show && (
        <ErrorContainer>
          <p className="error-msg">{msg}</p>
        </ErrorContainer>
      )}
    </>
  );
};

const ErrorContainer = styled.div`
  position: relative;

  p.error-msg {
    position: absolute;
    line-height: 1em;
    font-size: 1em;
    color: red;
  }
`;

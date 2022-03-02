import React from "react";
import styled from "@emotion/styled";

export interface IFieldErrorProps {
  show: boolean;
  msg: string;
}

export const initialErrorProps = {
  show: false,
  msg: "",
};

export const mergeErrorMessages = (
  errors: Array<{
    show: boolean;
    msg: string;
  }>
): string => {
  return errors.reduce((msg, error) => {
    return error.show ? `${msg}${error.msg}\n` : msg;
  }, "");
};

export const FieldError: React.FC<IFieldErrorProps> = ({
  show = false,
  msg = "",
}: IFieldErrorProps) => {
  return (
    <>
      {show && (
        <ErrorContainer>
          <span role="alert" className="field-error-msg">
            {msg}
          </span>
        </ErrorContainer>
      )}
    </>
  );
};

const ErrorContainer = styled.div`
  position: relative;

  .field-error-msg {
    white-space: pre-wrap;
    color: red;
    position: absolute;
  }
`;

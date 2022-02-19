import React from "react";
import styled from "@emotion/styled";
import { BREAKPOINTS } from "@/styles/ui-styled";

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
    color: red;

    @media screen and (min-width: ${BREAKPOINTS.mobileEnd}) {
      position: absolute;
    }
  }
`;

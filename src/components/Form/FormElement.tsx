import styled from "@emotion/styled";
import { BREAKPOINTS } from "@/styles/ui-styled";

export const FormElement = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;

  input,
  label,
  button,
  p {
    line-height: 1.2;
  }

  .field-error-msg {
    @media screen and (max-width: ${BREAKPOINTS.mobileEnd}) {
      position: static;
    }
  }
`;

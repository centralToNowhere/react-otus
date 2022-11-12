import styled from "@emotion/styled";
import { BREAKPOINTS } from "@/styles/ui-styled";

export const FormField = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 20px;

  @media (min-width: ${BREAKPOINTS.sm}) {
    flex: 1;
  }

  input {
    margin: 5px 0 0 0;
  }

  input,
  button {
    min-width: 100px;
  }
`;

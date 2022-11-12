import styled from "@emotion/styled";
import { BREAKPOINTS } from "@/styles/ui-styled";

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const FormGroupButtons = styled(FormGroup)`
  @media (min-width: ${BREAKPOINTS.sm}) {
    flex-wrap: nowrap;
  }
`;

import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

export const FormButton = styled.button`
  background: inherit;
  margin: 20px auto;

  &:focus {
    outline: 2px solid ${COLORS.accent} !important;
    border: 2px solid transparent;
  }
`;

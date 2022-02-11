import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

export const InputField = styled.input`
  background: inherit;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: ${COLORS.border};
  display: block;
  outline: 0;
  width: 100px;

  &:focus {
    border-bottom: 2px solid ${COLORS.accent};
  }
`;

import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid ${COLORS.border};
  border-radius: 10px;

  input,
  label,
  p {
    line-height: 1;
  }

  &.game-settings-form {
    .field-error-msg {
      background: ${COLORS.secondary};
    }
  }
`;

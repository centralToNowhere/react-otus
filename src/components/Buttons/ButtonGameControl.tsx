import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";
import { FormField } from "@/components/Form/FormField";
import { IButtonProps } from "@/components/Form";

export const ButtonGameControl: React.FC<IButtonProps> = (
  props: IButtonProps
) => {
  return (
    <FormField>
      <FormButtonContainer>
        <FormButton type={props.type} onClick={props.onClick} name={props.name}>
          {props.content}
        </FormButton>
      </FormButtonContainer>
    </FormField>
  );
};

const FormButtonContainer = styled.div`
  display: inline-block;
`;

const FormButton = styled.button`
  background: inherit;

  &:focus {
    outline: 2px solid ${COLORS.accent};
    border: 2px solid transparent;
  }
`;

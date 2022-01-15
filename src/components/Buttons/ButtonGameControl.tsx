import React from "react";
import styled from "@emotion/styled";
import { FormField } from "@/components/Form/FormField";
import { IButtonProps } from "@/components/Form";
import { FormButton } from "@/components/Buttons";

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

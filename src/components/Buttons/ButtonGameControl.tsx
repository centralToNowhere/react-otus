import React from "react";
import styled from "@emotion/styled";
import { FormField } from "@/components/Form/FormField";
import { IButtonProps } from "@/components/Form";
import { Button } from "@/components/Buttons";

export const ButtonGameControl: React.FC<IButtonProps> = (
  props: IButtonProps
) => {
  return (
    <FormField>
      <FormButtonContainer>
        <Button
          type={props.type}
          onClick={props.onClick}
          name={props.name}
          disabled={props.disabled}
        >
          {props.content}
        </Button>
      </FormButtonContainer>
    </FormField>
  );
};

const FormButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

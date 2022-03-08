import React, { useEffect } from "react";
import { l10n } from "@/l10n/ru";
import {
  InputField,
  LabelField,
  onBlurHandler,
  useOnChangeHandler,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce } from "@/utils";
import {
  onRawBlurHandler,
  onRawChangeHandler,
} from "@/components/Fields/FieldHandlers";
import styled from "@emotion/styled";

export const FieldCapacity: React.FC<
  IFieldProps<{
    rawCapacity: string;
  }>
> = (props) => {
  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(props.onChange, props.formValidators, props.onRawChange),
    FormContainer.inputDelay
  );

  const onChange = onRawChangeHandler((value) => {
    props.onRawChange(value);
    onChangeDebounced(value);
  });

  const onBlur = onRawBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, props.formValidators)(value);
  });

  useEffect(
    () => {
      return () => {
        onChangeDebounced.clear();
      };
    },
    // Stryker disable next-line ArrayDeclaration
    [onChangeDebounced]
  );

  return (
    <FormField>
      <LabelField htmlFor="capacity-percentage">
        {l10n.capacityLabel}
      </LabelField>
      <p>{props.formRawData.rawCapacity} %</p>
      <InputFieldCapacity
        id="capacity-percentage"
        type="range"
        max="100"
        min="0"
        step="1"
        name="capacityPercentage"
        value={props.formRawData.rawCapacity}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError show={props.error.show} msg={props.error.msg} />
    </FormField>
  );
};

const InputFieldCapacity = styled(InputField)`
  border: 0;
  &:focus {
    border-bottom: 0;
  }
`;

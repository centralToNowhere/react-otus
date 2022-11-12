import React, { useEffect } from "react";
import { l10n } from "@/l10n/ru";
import { onBlurHandler, useOnChangeHandler } from "@/components/Fields";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce } from "@/utils";
import {
  onRawBlurHandler,
  onRawChangeHandler,
} from "@/components/Fields/FieldHandlers";

export const FieldSpeed: React.FC<
  IFieldProps<{
    rawSpeed: string;
  }>
> = (props) => {
  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(props.onChange, props.formValidators, props.onRawChange),
    FormContainer.inputDelay
  );

  const onChange = onRawChangeHandler((value: string) => {
    props.onRawChange(value);
    onChangeDebounced(value);
  });

  const onBlur = onRawBlurHandler((value: string) => {
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
      <LabelField htmlFor="speed-change">{l10n.speedLabel}</LabelField>
      <InputField
        id="speed-change"
        type="range"
        max="100"
        min="0"
        step="2"
        name="speedChange"
        value={props.formRawData.rawSpeed}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError show={props.error.show} msg={props.error.msg} />
    </FormField>
  );
};

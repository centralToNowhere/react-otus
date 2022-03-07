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
  preventNegativeNumbers,
} from "@/components/Fields/FieldHandlers";

export const FieldCellSize: React.FC<
  IFieldProps<{
    rawMaxWidth: string;
    rawMaxHeight: string;
    rawCellSize: string;
    highlight: boolean;
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
      <LabelField htmlFor="cell-size">{l10n.cellSizeLabel}</LabelField>
      <InputField
        id="cell-size"
        type="number"
        step="1"
        name="cellSize"
        value={props.formRawData.rawCellSize}
        autoComplete="off"
        onChange={onChange}
        onKeyDown={preventNegativeNumbers}
        onBlur={onBlur}
        highlight={props.formRawData.highlight}
      />
      <FieldError show={props.error.show} msg={props.error.msg} />
    </FormField>
  );
};

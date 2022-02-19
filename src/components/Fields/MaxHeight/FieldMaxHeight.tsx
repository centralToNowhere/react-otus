import React, { useMemo, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  FieldValidator,
  InputField,
  LabelField,
  onBlurHandler,
  useOnChangeHandler,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { InputPatterns } from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce, isValidNonNegativeNumericString } from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";

export const FieldMaxHeight: React.FC<IFieldProps> = (props) => {
  const [maxFieldHeightString, setMaxFieldHeightString] = useState<string>(
    props.value
  );
  const [error, setError] = useState({
    show: false,
    msg: "Expected non-negative number",
  });

  const maxHeightValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown): boolean =>
        isValidNonNegativeNumericString(value),
      setError,
    }),
    []
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      maxHeightValidator,
      setMaxFieldHeightString
    ),
    FormContainer.inputDelay
  );

  const onChange = onDirtyChangeHandler((value: string) => {
    setMaxFieldHeightString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, maxHeightValidator)(value);
  });

  return (
    <FormField>
      <LabelField htmlFor="field-height">{l10n.maxHeightLabel}</LabelField>
      <InputField
        id="field-height"
        type="number"
        pattern={InputPatterns.float}
        step="1"
        name="fieldHeight"
        value={maxFieldHeightString}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError show={error.show} msg={error.msg} />
    </FormField>
  );
};

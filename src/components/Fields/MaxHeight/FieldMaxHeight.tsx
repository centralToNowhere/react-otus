import React, { useCallback, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  InputField,
  LabelField,
  onBlurHandler,
  onChangeHandler,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { InputPatterns } from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { Form, IFieldProps } from "@/components/Form";
import { debounce, isValidNonNegativeNumericString } from "@/utils";
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

  const validateFieldHeight = useCallback((value: unknown): boolean => {
    return isValidNonNegativeNumericString(value);
  }, []);

  const onChangeDebounced = useCallback(
    debounce<string>(
      onChangeHandler(
        props.onChange,
        validateFieldHeight,
        setMaxFieldHeightString,
        setError
      ),
      Form.inputDelay
    ),
    []
  );

  const onChange = useCallback(
    onDirtyChangeHandler((value: string) => {
      setMaxFieldHeightString(value);
      onChangeDebounced(value);
    }),
    []
  );

  const onBlur = useCallback(
    onDirtyBlurHandler((value) => {
      onChangeDebounced.clear();
      onBlurHandler(props.onChange, validateFieldHeight, setError)(value);
    }),
    []
  );

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

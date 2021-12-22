import React, { useState, useCallback } from "react";
import { l10n } from "@/l10n/ru";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import {
  InputPatterns,
  onChangeHandler,
  onBlurHandler,
} from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { Form, IFieldProps } from "@/components/Form";
import { isValidNonNegativeNumericString } from "@/utils";
import { debounce } from "@/utils/Debounce";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";

export const FieldMaxWidth: React.FC<IFieldProps> = (props) => {
  const [maxFieldWidthString, setMaxFieldWidthString] = useState<string>(
    props.value
  );
  const [error, setError] = useState({
    show: false,
    msg: "Expected non-negative number",
  });

  const validateFieldWidth = useCallback(
    (fieldWidthString: unknown): boolean => {
      return isValidNonNegativeNumericString(fieldWidthString);
    },
    []
  );

  const onChangeDebounced = useCallback(
    debounce<string>(
      onChangeHandler(
        props.onChange,
        validateFieldWidth,
        setMaxFieldWidthString,
        setError
      ),
      Form.inputDelay
    ),
    []
  );

  const onChange = useCallback(
    onDirtyChangeHandler((value) => {
      setMaxFieldWidthString(value);
      onChangeDebounced(value);
    }),
    []
  );

  const onBlur = useCallback(
    onDirtyBlurHandler((value) => {
      onChangeDebounced.clear();
      onBlurHandler(props.onChange, validateFieldWidth, setError)(value);
    }),
    []
  );

  return (
    <FormField>
      <LabelField htmlFor="field-width">{l10n.maxWidthLabel}</LabelField>
      <InputField
        id="field-width"
        type="number"
        pattern={InputPatterns.float}
        step="1"
        name="fieldWidth"
        autoFocus={true}
        value={maxFieldWidthString}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError show={error.show} msg={error.msg} />
    </FormField>
  );
};

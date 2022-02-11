import React, { useCallback, useState } from "react";
import { l10n } from "@/l10n/ru";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import {
  InputPatterns,
  useOnChangeHandler,
  onBlurHandler,
} from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { isValidNonNegativeNumericString } from "@/utils";
import { useDebounce } from "@/utils/Debounce";
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

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      validateFieldWidth,
      setMaxFieldWidthString,
      setError
    ),
    FormContainer.inputDelay
  );

  const onChange = onDirtyChangeHandler((value) => {
    setMaxFieldWidthString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, validateFieldWidth, setError)(value);
  });

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

import React, { useCallback, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  InputPatterns,
  onBlurHandler,
  onChangeHandler,
} from "@/components/Fields";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { Form, IFieldProps } from "@/components/Form";
import { debounce, isValidPositiveNumericString } from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";

export const FieldSpeed: React.FC<IFieldProps> = (props) => {
  const [speedString, setSpeedString] = useState<string>(props.value);
  const [error, setError] = useState({
    show: false,
    msg: "Expected positive number",
  });

  const validateSpeed = useCallback((value: unknown): boolean => {
    return isValidPositiveNumericString(value);
  }, []);

  const onChangeDebounced = useCallback(
    debounce<string>(
      onChangeHandler(props.onChange, validateSpeed, setSpeedString, setError),
      Form.inputDelay
    ),
    []
  );

  const onChange = useCallback(
    onDirtyChangeHandler((value: string) => {
      setSpeedString(value);
      onChangeDebounced(value);
    }),
    []
  );

  const onBlur = useCallback(
    onDirtyBlurHandler((value: string) => {
      onChangeDebounced.clear();
      onBlurHandler(props.onChange, validateSpeed, setError)(value);
    }),
    []
  );

  return (
    <FormField>
      <LabelField htmlFor="speed-change">{l10n.speedLabel}</LabelField>
      <InputField
        id="speed-change"
        type="number"
        pattern={InputPatterns.float}
        step="0.1"
        name="speedChange"
        value={speedString}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError show={error.show} msg={error.msg} />
    </FormField>
  );
};

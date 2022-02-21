import React, { useEffect, useMemo, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  FieldValidator,
  InputPatterns,
  onBlurHandler,
  useOnChangeHandler,
} from "@/components/Fields";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce, isValidPositiveNumericString } from "@/utils";
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

  const speedValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown): boolean =>
        isValidPositiveNumericString(value),
      setError,
    }),
    []
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(props.onChange, speedValidator, setSpeedString),
    FormContainer.inputDelay
  );

  const onChange = onDirtyChangeHandler((value: string) => {
    setSpeedString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value: string) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, speedValidator)(value);
  });

  useEffect(() => {
    return () => {
      onChangeDebounced.clear();
    };
  }, [onChangeDebounced]);

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

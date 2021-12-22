import React, { useCallback, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  InputField,
  LabelField,
  onBlurHandler,
  onChangeHandler,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { Form, IFieldProps } from "@/components/Form";
import { debounce, isValidNonNegativeNumericString } from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";

export const FieldCapacity: React.FC<IFieldProps> = (props) => {
  const [capacityString, setCapacityString] = useState<string>(props.value);
  const [error, setError] = useState({
    show: false,
    msg: "Expected non-negative number",
  });

  const validateCapacity = useCallback((value: unknown): boolean => {
    return isValidNonNegativeNumericString(value);
  }, []);

  const onChangeDebounced = useCallback(
    debounce<string>(
      onChangeHandler(
        props.onChange,
        validateCapacity,
        setCapacityString,
        setError
      ),
      Form.inputDelay
    ),
    []
  );

  const onChange = useCallback(
    onDirtyChangeHandler((value) => {
      setCapacityString(value);
      onChangeDebounced(value);
    }),
    []
  );

  const onBlur = useCallback(
    onDirtyBlurHandler((value) => {
      onChangeDebounced.clear();
      onBlurHandler(props.onChange, validateCapacity, setError)(value);
    }),
    []
  );

  return (
    <FormField>
      <LabelField htmlFor="capacity-percentage">
        {l10n.capacityLabel}
      </LabelField>
      <p>{capacityString} %</p>
      <InputField
        id="capacity-percentage"
        type="range"
        max="100"
        min="0"
        step="1"
        name="capacityPercentage"
        value={capacityString}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError show={error.show} msg={error.msg} />
    </FormField>
  );
};

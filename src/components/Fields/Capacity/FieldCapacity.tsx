import React, { useCallback, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  InputField,
  LabelField,
  onBlurHandler,
  useOnChangeHandler,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { Form, IFieldProps } from "@/components/Form";
import { useDebounce, isValidNonNegativeNumericString } from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";
import styled from "@emotion/styled";

export const FieldCapacity: React.FC<IFieldProps> = (props) => {
  const [capacityString, setCapacityString] = useState<string>(props.value);
  const [error, setError] = useState({
    show: false,
    msg: "Expected non-negative number",
  });

  const validateCapacity = useCallback((value: unknown): boolean => {
    return isValidNonNegativeNumericString(value);
  }, []);

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      validateCapacity,
      setCapacityString,
      setError
    ),
    Form.inputDelay
  );

  const onChange = onDirtyChangeHandler((value) => {
    setCapacityString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, validateCapacity, setError)(value);
  });

  return (
    <FormField>
      <LabelField htmlFor="capacity-percentage">
        {l10n.capacityLabel}
      </LabelField>
      <p>{capacityString} %</p>
      <InputFieldCapacity
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

const InputFieldCapacity = styled(InputField)`
  &:focus {
    border-bottom: 0;
  }
`;

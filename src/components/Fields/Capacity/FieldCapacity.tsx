import React, { useEffect, useMemo, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  FieldValidator,
  InputField,
  LabelField,
  onBlurHandler,
  useOnChangeHandler,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
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

  const capacityValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown): boolean =>
        isValidNonNegativeNumericString(value),
      setError,
    }),
    []
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(props.onChange, capacityValidator, setCapacityString),
    FormContainer.inputDelay
  );

  const onChange = onDirtyChangeHandler((value) => {
    setCapacityString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, capacityValidator)(value);
  });

  useEffect(() => {
    return () => {
      onChangeDebounced.clear();
    };
  }, [onChangeDebounced]);

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

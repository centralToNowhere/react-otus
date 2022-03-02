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
  onRawBlurHandler,
  onRawChangeHandler,
} from "@/components/Fields/FieldHandlers";
import styled from "@emotion/styled";

export const FieldCapacity: React.FC<
  IFieldProps<{
    rawCapacity: string;
  }>
> = (props) => {
  const [error, setError] = useState({
    show: false,
    msg: "",
  });

  const capacityValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown) => isValidNonNegativeNumericString(value),
      setError,
    }),
    []
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(props.onChange, capacityValidator, props.onRawChange),
    FormContainer.inputDelay
  );

  const onChange = onRawChangeHandler((value) => {
    props.onRawChange(value);
    onChangeDebounced(value);
  });

  const onBlur = onRawBlurHandler((value) => {
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
      <p>{props.formRawData.rawCapacity} %</p>
      <InputFieldCapacity
        id="capacity-percentage"
        type="range"
        max="100"
        min="0"
        step="1"
        name="capacityPercentage"
        value={props.formRawData.rawCapacity}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError show={error.show} msg={error.msg} />
    </FormField>
  );
};

const InputFieldCapacity = styled(InputField)`
  border: 0;
  &:focus {
    border-bottom: 0;
  }
`;

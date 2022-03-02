import React, { useEffect, useMemo, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  FieldValidator,
  onBlurHandler,
  useOnChangeHandler,
} from "@/components/Fields";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce, isValidPositiveNumericString } from "@/utils";
import {
  onRawBlurHandler,
  onRawChangeHandler,
  preventNegativeNumbers,
} from "@/components/Fields/FieldHandlers";

export const FieldSpeed: React.FC<
  IFieldProps<{
    rawSpeed: string;
  }>
> = (props) => {
  const [error, setError] = useState({
    show: false,
    msg: "",
  });

  const speedValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown) => isValidPositiveNumericString(value),
      setError,
    }),
    []
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(props.onChange, speedValidator, props.onRawChange),
    FormContainer.inputDelay
  );

  const onChange = onRawChangeHandler((value: string) => {
    props.onRawChange(value);
    onChangeDebounced(value);
  });

  const onBlur = onRawBlurHandler((value: string) => {
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
        step="0.1"
        name="speedChange"
        value={props.formRawData.rawSpeed}
        autoComplete="off"
        onChange={onChange}
        onKeyDown={preventNegativeNumbers}
        onBlur={onBlur}
      />
      <FieldError show={error.show} msg={error.msg} />
    </FormField>
  );
};

import React, { useEffect, useMemo, useState } from "react";
import { l10n } from "@/l10n/ru";
import { FieldValidator, InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { useOnChangeHandler, onBlurHandler } from "@/components/Fields";
import {
  FieldError,
  initialErrorProps,
} from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce, isValidPositiveNumericString } from "@/utils";
import {
  onRawBlurHandler,
  onRawChangeHandler,
  preventNegativeNumbers,
} from "@/components/Fields/FieldHandlers";

export const FieldMaxWidth: React.FC<
  IFieldProps<{
    rawMaxWidth: string;
    rawMaxHeight: string;
    rawCellSize: string;
    highlight: boolean;
  }>
> = (props) => {
  const [notNonNegativeError, setNonNegativeError] = useState({
    ...initialErrorProps,
  });

  const maxWidthValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown) => isValidPositiveNumericString(value),
      setError: setNonNegativeError,
    }),
    []
  );

  const formValidator = props.formValidator;

  const cellsAmountValidator: FieldValidator = useMemo(
    () => ({
      validator: () => {
        return formValidator ? formValidator() || "" : "";
      },
    }),
    [formValidator]
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      useMemo(
        () => [maxWidthValidator, cellsAmountValidator],
        [maxWidthValidator, cellsAmountValidator]
      ),
      props.onRawChange
    ),
    FormContainer.inputDelay
  );

  const onChange = onRawChangeHandler((value) => {
    props.onRawChange(value);
    onChangeDebounced(value);
  });

  const onBlur = onRawBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, [maxWidthValidator, cellsAmountValidator])(
      value
    );
  });

  useEffect(() => {
    return () => {
      onChangeDebounced.clear();
    };
  }, [onChangeDebounced]);

  return (
    <FormField>
      <LabelField htmlFor="field-width">{l10n.maxWidthLabel}</LabelField>
      <InputField
        id="field-width"
        type="number"
        step="1"
        name="fieldWidth"
        autoFocus={true}
        value={props.formRawData.rawMaxWidth}
        autoComplete="off"
        onChange={onChange}
        onKeyDown={preventNegativeNumbers}
        onBlur={onBlur}
        highlight={props.formRawData.highlight}
      />
      <FieldError
        show={notNonNegativeError.show}
        msg={notNonNegativeError.msg}
      />
    </FormField>
  );
};

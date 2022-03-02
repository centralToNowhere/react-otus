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

export const FieldMaxHeight: React.FC<
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

  const maxHeightValidator: FieldValidator = useMemo(
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
        () => [maxHeightValidator, cellsAmountValidator],
        [maxHeightValidator, cellsAmountValidator]
      ),
      props.onRawChange
    ),
    FormContainer.inputDelay
  );

  const onChange = onRawChangeHandler((value: string) => {
    props.onRawChange(value);
    onChangeDebounced(value);
  });

  const onBlur = onRawBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, [maxHeightValidator, cellsAmountValidator])(
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
      <LabelField htmlFor="field-height">{l10n.maxHeightLabel}</LabelField>
      <InputField
        id="field-height"
        type="number"
        step="1"
        name="fieldHeight"
        value={props.formRawData.rawMaxHeight}
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

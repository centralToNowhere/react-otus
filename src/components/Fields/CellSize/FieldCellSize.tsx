import React, { useEffect, useMemo, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  InputField,
  LabelField,
  onBlurHandler,
  useOnChangeHandler,
  FieldValidator,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import {
  FieldError,
  initialErrorProps,
} from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce, isValidCellSizeString } from "@/utils";
import {
  onRawBlurHandler,
  onRawChangeHandler,
  preventNegativeNumbers,
} from "@/components/Fields/FieldHandlers";

export const FieldCellSize: React.FC<
  IFieldProps<{
    rawMaxWidth: string;
    rawMaxHeight: string;
    rawCellSize: string;
    highlight: boolean;
  }>
> = (props) => {
  const [cellSizeError, setCellSizeError] = useState({
    ...initialErrorProps,
  });

  const cellSizeValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown) => isValidCellSizeString(value),
      setError: setCellSizeError,
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
        () => [cellSizeValidator, cellsAmountValidator],
        [cellSizeValidator, cellsAmountValidator]
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
    onBlurHandler(props.onChange, [cellSizeValidator, cellsAmountValidator])(
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
      <LabelField htmlFor="cell-size">{l10n.cellSizeLabel}</LabelField>
      <InputField
        id="cell-size"
        type="number"
        step="1"
        name="cellSize"
        value={props.formRawData.rawCellSize}
        autoComplete="off"
        onChange={onChange}
        onKeyDown={preventNegativeNumbers}
        onBlur={onBlur}
        highlight={props.formRawData.highlight}
      />
      <FieldError show={cellSizeError.show} msg={cellSizeError.msg} />
    </FormField>
  );
};

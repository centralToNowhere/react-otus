import React, { useEffect, useMemo, useState } from "react";
import { l10n } from "@/l10n/ru";
import { FieldValidator, InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import {
  InputPatterns,
  useOnChangeHandler,
  onBlurHandler,
} from "@/components/Fields";
import {
  FieldError,
  initialErrorProps,
  mergeErrorMessages,
} from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import {
  useDebounce,
  isValidNonNegativeNumericString,
  isValidCellsAmountMax,
  isAtLeastOneCellDisplayed,
} from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";

export const FieldMaxWidth: React.FC<IFieldProps> = (props) => {
  const [maxFieldWidthString, setMaxFieldWidthString] = useState<string>(
    props.value
  );

  const fieldMaxHeight = useSelector(
    (state: RootState) => state.fieldControl.maxFieldHeight
  );
  const cellSize = useSelector(
    (state: RootState) => state.fieldControl.cellSize
  );

  const [notNonNegativeError, setNonNegativeError] = useState({
    ...initialErrorProps,
  });

  const [cellsAmountMaxError, setCellsAmountMaxError] = useState({
    ...initialErrorProps,
  });

  const [cellsAmountMinError, setCellsAmountMinError] = useState({
    ...initialErrorProps,
  });

  const maxWidthValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown) => isValidNonNegativeNumericString(value),
      setError: setNonNegativeError,
    }),
    []
  );

  const cellsAmountMaxValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: string) =>
        isValidCellsAmountMax(cellSize, Number(value), fieldMaxHeight),
      setError: setCellsAmountMaxError,
    }),
    [fieldMaxHeight, cellSize]
  );

  const cellsAmountMinValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: string) =>
        isAtLeastOneCellDisplayed(cellSize, Number(value), fieldMaxHeight),
      setError: setCellsAmountMinError,
    }),
    [fieldMaxHeight, cellSize]
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      useMemo(
        () => [
          maxWidthValidator,
          cellsAmountMinValidator,
          cellsAmountMaxValidator,
        ],
        [maxWidthValidator, cellsAmountMinValidator, cellsAmountMaxValidator]
      ),
      setMaxFieldWidthString
    ),
    FormContainer.inputDelay
  );

  const onChange = onDirtyChangeHandler((value) => {
    setMaxFieldWidthString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, [
      maxWidthValidator,
      cellsAmountMinValidator,
      cellsAmountMaxValidator,
    ])(value);
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
        pattern={InputPatterns.float}
        step="1"
        name="fieldWidth"
        autoFocus={true}
        value={maxFieldWidthString}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError
        show={
          notNonNegativeError.show ||
          cellsAmountMinError.show ||
          cellsAmountMaxError.show
        }
        msg={mergeErrorMessages([
          notNonNegativeError,
          cellsAmountMinError,
          cellsAmountMaxError,
        ])}
      />
    </FormField>
  );
};

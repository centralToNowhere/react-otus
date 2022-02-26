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
import { InputPatterns } from "@/components/Fields";
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

export const FieldMaxHeight: React.FC<IFieldProps> = (props) => {
  const [maxFieldHeightString, setMaxFieldHeightString] = useState<string>(
    props.value
  );

  const fieldMaxWidth = useSelector(
    (state: RootState) => state.fieldControl.maxFieldWidth
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

  const maxHeightValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown) => isValidNonNegativeNumericString(value),
      setError: setNonNegativeError,
    }),
    []
  );

  const cellsAmountMaxValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: string) =>
        isValidCellsAmountMax(cellSize, fieldMaxWidth, Number(value)),
      setError: setCellsAmountMaxError,
    }),
    [fieldMaxWidth, cellSize]
  );

  const cellsAmountMinValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: string) =>
        isAtLeastOneCellDisplayed(cellSize, fieldMaxWidth, Number(value)),
      setError: setCellsAmountMinError,
    }),
    [fieldMaxWidth, cellSize]
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      useMemo(
        () => [
          maxHeightValidator,
          cellsAmountMinValidator,
          cellsAmountMaxValidator,
        ],
        [maxHeightValidator, cellsAmountMinValidator, cellsAmountMaxValidator]
      ),
      setMaxFieldHeightString
    ),
    FormContainer.inputDelay
  );

  const onChange = onDirtyChangeHandler((value: string) => {
    setMaxFieldHeightString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, [
      maxHeightValidator,
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
      <LabelField htmlFor="field-height">{l10n.maxHeightLabel}</LabelField>
      <InputField
        id="field-height"
        type="number"
        pattern={InputPatterns.float}
        step="1"
        name="fieldHeight"
        value={maxFieldHeightString}
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

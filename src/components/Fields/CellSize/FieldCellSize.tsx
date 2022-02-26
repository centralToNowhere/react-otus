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
import { InputPatterns } from "@/components/Fields";
import {
  FieldError,
  initialErrorProps,
  mergeErrorMessages,
} from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import {
  useDebounce,
  isValidCellSizeString,
  isValidCellsAmountMax,
  isAtLeastOneCellDisplayed,
} from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";

export const FieldCellSize: React.FC<IFieldProps> = (props) => {
  const [cellSizeString, setCellSizeString] = useState<string>(props.value);
  const fieldMaxWidth = useSelector(
    (state: RootState) => state.fieldControl.maxFieldWidth
  );
  const fieldMaxHeight = useSelector(
    (state: RootState) => state.fieldControl.maxFieldHeight
  );

  const [cellSizeError, setCellSizeError] = useState({
    ...initialErrorProps,
  });

  const [cellsAmountMaxError, setCellsAmountMaxError] = useState({
    ...initialErrorProps,
  });

  const [cellsAmountMinError, setCellsAmountMinError] = useState({
    ...initialErrorProps,
  });

  const cellSizeValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown) => isValidCellSizeString(value),
      setError: setCellSizeError,
    }),
    []
  );

  const cellsAmountMaxValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: string) =>
        isValidCellsAmountMax(Number(value), fieldMaxWidth, fieldMaxHeight),
      setError: setCellsAmountMaxError,
    }),
    [fieldMaxWidth, fieldMaxHeight]
  );

  const cellsAmountMinValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: string) =>
        isAtLeastOneCellDisplayed(Number(value), fieldMaxWidth, fieldMaxHeight),
      setError: setCellsAmountMinError,
    }),
    [fieldMaxWidth, fieldMaxHeight]
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      useMemo(
        () => [
          cellSizeValidator,
          cellsAmountMinValidator,
          cellsAmountMaxValidator,
        ],
        [cellSizeValidator, cellsAmountMinValidator, cellsAmountMaxValidator]
      ),
      setCellSizeString
    ),
    FormContainer.inputDelay
  );

  const onChange = onDirtyChangeHandler((value) => {
    setCellSizeString(value);
    onChangeDebounced(value);
  });

  const onBlur = onDirtyBlurHandler((value) => {
    onChangeDebounced.clear();
    onBlurHandler(props.onChange, [
      cellSizeValidator,
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
      <LabelField htmlFor="cell-size">{l10n.cellSizeLabel}</LabelField>
      <InputField
        id="cell-size"
        type="number"
        pattern={InputPatterns.number}
        step="1"
        name="cellSize"
        value={cellSizeString}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldError
        show={
          cellSizeError.show ||
          cellsAmountMinError.show ||
          cellsAmountMaxError.show
        }
        msg={mergeErrorMessages([
          cellSizeError,
          cellsAmountMinError,
          cellsAmountMaxError,
        ])}
      />
    </FormField>
  );
};

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
  mergeErrorMessages,
} from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import {
  useDebounce,
  isValidNonNegativeNumericString,
  isValidCellsAmount,
} from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";
import { maxCellsAmount } from "@/Cell/Cell";

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
    show: false,
    msg: "Expected non-negative number",
  });

  const [cellsAmountError, setCellsAmountError] = useState({
    show: false,
    msg: `Maximum cells amount - ${maxCellsAmount}`,
  });

  const maxWidthValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: unknown): boolean =>
        isValidNonNegativeNumericString(value),
      setError: setNonNegativeError,
    }),
    []
  );

  const cellsAmountValidator: FieldValidator = useMemo(
    () => ({
      validator: (value: string) =>
        isValidCellsAmount(cellSize, Number(value), fieldMaxHeight),
      setError: setCellsAmountError,
    }),
    [fieldMaxHeight, cellSize]
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      useMemo(
        () => [maxWidthValidator, cellsAmountValidator],
        [maxWidthValidator, cellsAmountValidator]
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
        show={notNonNegativeError.show || cellsAmountError.show}
        msg={mergeErrorMessages([notNonNegativeError, cellsAmountError])}
      />
    </FormField>
  );
};

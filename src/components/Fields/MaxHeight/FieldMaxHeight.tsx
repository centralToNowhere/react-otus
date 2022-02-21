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
    show: false,
    msg: "Expected non-negative number",
  });

  const [cellsAmountError, setCellsAmountError] = useState({
    show: false,
    msg: `Maximum cells amount - ${maxCellsAmount}`,
  });

  const maxHeightValidator: FieldValidator = useMemo(
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
        isValidCellsAmount(cellSize, fieldMaxWidth, Number(value)),
      setError: setCellsAmountError,
    }),
    [fieldMaxWidth, cellSize]
  );

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      useMemo(
        () => [maxHeightValidator, cellsAmountValidator],
        [maxHeightValidator, cellsAmountValidator]
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
        pattern={InputPatterns.float}
        step="1"
        name="fieldHeight"
        value={maxFieldHeightString}
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

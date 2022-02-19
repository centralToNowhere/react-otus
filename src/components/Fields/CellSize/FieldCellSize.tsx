import React, { useMemo, useState } from "react";
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
  mergeErrorMessages,
} from "@/components/Fields/FieldError/FieldError";
import { FormContainer, IFieldProps } from "@/components/Form";
import { useDebounce, isValidCellSizeString } from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";
import { useSelector } from "react-redux";
import { isValidCellsAmount } from "@/utils/Validators";
import { maxCellsAmount } from "@/Cell/Cell";
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
    show: false,
    msg: "Expected positive number",
  });

  const [cellsAmountError, setCellsAmountError] = useState({
    show: false,
    msg: `Maximum cells amount - ${maxCellsAmount}`,
  });

  const cellSizeValidator: FieldValidator = {
    validator: (value: unknown): boolean => isValidCellSizeString(value),
    setError: setCellSizeError,
  };

  const cellsAmountValidator: FieldValidator = {
    validator: (value: string) =>
      isValidCellsAmount(Number(value), fieldMaxWidth, fieldMaxHeight),
    setError: setCellsAmountError,
  };

  const onChangeDebounced = useDebounce<string>(
    useOnChangeHandler(
      props.onChange,
      useMemo(
        () => [cellSizeValidator, cellsAmountValidator],
        [fieldMaxHeight, fieldMaxWidth]
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
    onBlurHandler(props.onChange, [cellSizeValidator, cellsAmountValidator])(
      value
    );
  });

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
        show={cellSizeError.show || cellsAmountError.show}
        msg={mergeErrorMessages([cellSizeError, cellsAmountError])}
      />
    </FormField>
  );
};

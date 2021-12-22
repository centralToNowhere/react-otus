import React, { useCallback, useState } from "react";
import { l10n } from "@/l10n/ru";
import {
  InputField,
  LabelField,
  onBlurHandler,
  onChangeHandler,
} from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { InputPatterns } from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { Form, IFieldProps } from "@/components/Form";
import { debounce, isValidCellSizeString } from "@/utils";
import {
  onDirtyBlurHandler,
  onDirtyChangeHandler,
} from "@/components/Fields/FieldHandlers";

export const FieldCellSize: React.FC<IFieldProps> = (props) => {
  const [cellSizeString, setCellSizeString] = useState<string>(props.value);
  const [error, setError] = useState({
    show: false,
    msg: "Expected number >= 10",
  });

  const validateCellSize = useCallback((value: unknown): boolean => {
    return isValidCellSizeString(value);
  }, []);

  const onChangeDebounced = useCallback(
    debounce<string>(
      onChangeHandler(
        props.onChange,
        validateCellSize,
        setCellSizeString,
        setError
      ),
      Form.inputDelay
    ),
    []
  );

  const onChange = useCallback(
    onDirtyChangeHandler((value) => {
      setCellSizeString(value);
      onChangeDebounced(value);
    }),
    []
  );

  const onBlur = useCallback(
    onDirtyBlurHandler((value) => {
      onChangeDebounced.clear();
      onBlurHandler(props.onChange, validateCellSize, setError)(value);
    }),
    []
  );

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
      <FieldError show={error.show} msg={error.msg} />
    </FormField>
  );
};

import { Callback } from "@/components/Form/FormContainer";
import React, { useCallback } from "react";

export type OnValidateCallback = (
  isValid: boolean,
  errorMessage: string
) => void;

export interface FieldValidator {
  validate: (...args: string[]) => boolean;
  errorMessage: string;
  onValidate: OnValidateCallback;
}

export interface FieldValidatorNumeric
  extends Omit<FieldValidator, "validate"> {
  validate: (...args: number[]) => boolean;
}

export const onRawChangeHandler = (
  onDirtyChangeCallback: (value: string) => void
): Callback<React.ChangeEvent<HTMLInputElement>, void> => {
  return (e) => {
    onDirtyChangeCallback(e.target.value);
  };
};

export const onRawBlurHandler = (
  onDirtyBlurCallback: (value: string) => void
): Callback<React.FocusEvent<HTMLInputElement>, void> => {
  return (e) => {
    onDirtyBlurCallback(e.target.value);
  };
};

export const validate = (
  fieldValidators: FieldValidator[] | FieldValidator,
  value: string
): boolean => {
  if (!Array.isArray(fieldValidators)) {
    fieldValidators = [fieldValidators];
  }

  let validatorsSucceeded = 0;

  fieldValidators.forEach((fieldValidator) => {
    const validationResult = fieldValidator.validate(value);

    fieldValidator.onValidate(validationResult, fieldValidator.errorMessage);

    if (validationResult) {
      validatorsSucceeded++;
    }
  });

  return validatorsSucceeded === fieldValidators.length;
};

export const useOnChangeHandler = (
  onChange: (value: string) => void,
  fieldValidators: FieldValidator[] | FieldValidator,
  setRawData: (value: string) => void
): Callback<string, void> =>
  useCallback(
    (value: string) => {
      if (validate(fieldValidators, value)) {
        onChange(value);
        setRawData(value);
      }
    },
    [onChange, fieldValidators, setRawData]
  );

export const onBlurHandler =
  (
    onChange: (value: string) => void,
    fieldValidators: FieldValidator[] | FieldValidator
  ): Callback<string, void> =>
  (value: string) => {
    if (validate(fieldValidators, value)) {
      onChange(value);
    }
  };

export const preventNegativeNumbers = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (e.key === "-") {
    e.preventDefault();
  }
};

import { Callback } from "@/components/Form/FormContainer";
import React, { useCallback } from "react";

export interface FieldValidator {
  validator: (value: string) => string | true;
  setError?: React.Dispatch<
    React.SetStateAction<{ show: boolean; msg: string }>
  >;
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

const validate = (
  fieldValidators: FieldValidator[] | FieldValidator,
  value: string
): boolean => {
  if (!Array.isArray(fieldValidators)) {
    fieldValidators = [fieldValidators];
  }

  let validatorsSucceeded = 0;

  fieldValidators.forEach((fieldValidator) => {
    const validationResult = fieldValidator.validator(value);

    if (validationResult === true) {
      validatorsSucceeded++;

      if (fieldValidator.setError) {
        fieldValidator.setError(() => {
          return {
            show: false,
            msg: "",
          };
        });
      }
    } else {
      if (fieldValidator.setError) {
        fieldValidator.setError(() => {
          return {
            show: true,
            msg: validationResult,
          };
        });
      }
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

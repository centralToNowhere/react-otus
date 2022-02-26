import { Callback } from "@/components/Form/FormContainer";
import React, { useCallback } from "react";

export interface FieldValidator {
  validator: (value: string) => boolean;
  setError: React.Dispatch<
    React.SetStateAction<{ show: boolean; msg: string }>
  >;
}

export const onDirtyChangeHandler = (
  onDirtyChangeCallback: (value: string) => void
): Callback<React.ChangeEvent<HTMLInputElement>, void> => {
  return (e) => {
    onDirtyChangeCallback(e.target.value);
  };
};

export const onDirtyBlurHandler = (
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
    if (fieldValidator.validator(value)) {
      validatorsSucceeded++;
      fieldValidator.setError((prevState) => {
        return {
          ...prevState,
          show: false,
        };
      });
    } else {
      fieldValidator.setError((prevState) => {
        return {
          ...prevState,
          show: true,
        };
      });
    }
  });

  return validatorsSucceeded === fieldValidators.length;
};

export const useOnChangeHandler = (
  onChange: (value: string) => void,
  fieldValidators: FieldValidator[] | FieldValidator,
  setFieldString: React.Dispatch<React.SetStateAction<string>>
): Callback<string, void> =>
  useCallback(
    (value: string) => {
      if (validate(fieldValidators, value)) {
        onChange(value);
        setFieldString(value);
      }
    },
    [onChange, fieldValidators, setFieldString]
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

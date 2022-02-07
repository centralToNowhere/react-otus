import { Callback } from "@/components/Form/FormContainer";
import React, { useCallback } from "react";

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

export const useOnChangeHandler = (
  onChange: (value: string) => void,
  validator: (value: string) => boolean,
  setFieldString: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<{ show: boolean; msg: string }>>
): Callback<string, void> =>
  useCallback(
    (value: string) => {
      if (validator(value)) {
        onChange(value);
        setFieldString(value);
        setError((prevState) => {
          return {
            ...prevState,
            show: false,
          };
        });

        return;
      }

      setError((prevState) => {
        return {
          ...prevState,
          show: true,
        };
      });
    },
    [onChange, validator, setFieldString, setError]
  );

export const onBlurHandler =
  (
    onChange: (value: string) => void,
    validator: (value: string) => boolean,
    setError: React.Dispatch<
      React.SetStateAction<{ show: boolean; msg: string }>
    >
  ): Callback<string, void> =>
  (value: string) => {
    if (validator(value)) {
      onChange(value);
      setError((prevState) => {
        return {
          ...prevState,
          show: false,
        };
      });

      return;
    }

    setError((prevState) => {
      return {
        ...prevState,
        show: true,
      };
    });
  };

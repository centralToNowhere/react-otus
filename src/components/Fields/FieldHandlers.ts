import { Callback } from "@/components/Form/Form";
import React from "react";

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

export const onChangeHandler =
  (
    onChange: (value: string) => void,
    validator: (value: string) => boolean,
    setFieldString: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<
      React.SetStateAction<{ show: boolean; msg: string }>
    >
  ): Callback<string, void> =>
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
  };

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

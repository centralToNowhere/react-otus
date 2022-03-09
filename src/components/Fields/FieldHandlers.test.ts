import { renderHook, act } from "@testing-library/react-hooks";
import { useOnChangeHandler } from "@/components/Fields/FieldHandlers";
import {
  isValidCellSizeString,
  isValidNonNegativeNumericString,
} from "@/utils";

describe("useOnChangeHandler", () => {
  it("should call onChange and setRawData", () => {
    const onChange = jest.fn();
    const fieldValidators = [
      isValidCellSizeString(),
      isValidNonNegativeNumericString(),
    ];
    const setRawData = jest.fn();

    const { result } = renderHook(() =>
      useOnChangeHandler(onChange, fieldValidators, setRawData)
    );

    result.current("25");
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith("25");
    expect(setRawData).toHaveBeenCalledWith("25");
  });

  it("should rerender", () => {
    const onChange = jest.fn();
    const updatedOnChange = jest.fn();
    const fieldValidators = [
      isValidCellSizeString(),
      isValidNonNegativeNumericString(),
    ];
    const setRawData = jest.fn();

    const { result, rerender } = renderHook(
      ({ onChange, fieldValidators, setRawData }) =>
        useOnChangeHandler(onChange, fieldValidators, setRawData),
      {
        initialProps: {
          onChange,
          fieldValidators,
          setRawData,
        },
      }
    );

    result.current("35");

    rerender({
      onChange: updatedOnChange,
      fieldValidators,
      setRawData,
    });

    result.current("25");

    expect(updatedOnChange).toHaveBeenCalledWith("25");
  });

  it("should render with one validator", () => {
    const onChange = jest.fn();
    const fieldValidators = isValidNonNegativeNumericString();
    const setRawData = jest.fn();

    const { result } = renderHook(() =>
      useOnChangeHandler(onChange, fieldValidators, setRawData)
    );

    result.current("25");
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith("25");
    expect(setRawData).toHaveBeenCalledWith("25");
  });

  it("should not render with one validator", () => {
    const onChange = jest.fn();
    const fieldValidators = isValidNonNegativeNumericString();
    const setRawData = jest.fn();

    const { result } = renderHook(() =>
      useOnChangeHandler(onChange, fieldValidators, setRawData)
    );

    result.current("-25");
    expect(onChange).not.toHaveBeenCalled();
  });

  describe("should not call onChange and setRawData", () => {
    it("both invalid", () => {
      const onChange = jest.fn();
      const fieldValidators = [
        isValidCellSizeString(),
        isValidNonNegativeNumericString(),
      ];
      const setRawData = jest.fn();

      const { result } = renderHook(() =>
        useOnChangeHandler(onChange, fieldValidators, setRawData)
      );

      result.current("-35");
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(setRawData).toHaveBeenCalledTimes(0);
    });

    it("cell size is invalid, non negative is valid", () => {
      const onChange = jest.fn();
      const fieldValidators = [
        isValidCellSizeString(),
        isValidNonNegativeNumericString(),
      ];
      const setRawData = jest.fn();

      const { result } = renderHook(() =>
        useOnChangeHandler(onChange, fieldValidators, setRawData)
      );

      result.current("0");
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(setRawData).toHaveBeenCalledTimes(0);
    });
  });
});

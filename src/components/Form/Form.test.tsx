import React from "react";
import userEvent from "@testing-library/user-event/dist";
import { render, screen, waitFor } from "@testing-library/react";
import { Form, isValidNumericString } from "./Form";

const inputsData = [
  {
    callbackName: "onCellSizeChange",
    labelText: "Размер ячейки:",
    testValues: {
      shouldCallOnChange: ["10", "100", "1000"],
      shouldNotCallOnChange: ["1", "9", "-1", "", "0"],
    },
  },
  {
    callbackName: "onMaxFieldWidthChange",
    labelText: "Макс. ширина:",
    testValues: {
      shouldCallOnChange: ["1", "10", "100", "1000", "0"],
      shouldNotCallOnChange: ["-1", "", "qwerty"],
    },
  },
  {
    callbackName: "onMaxFieldHeightChange",
    labelText: "Макс. высота:",
    testValues: {
      shouldCallOnChange: ["1", "10", "100", "1000", "0"],
      shouldNotCallOnChange: ["-1", "", "qwerty"],
    },
  },
  {
    callbackName: "onCapacityChange",
    labelText: "Процент заполненности:",
    testValues: {
      shouldCallOnChange: [
        "1",
        "10",
        "100",
        "1000",
        "0.1",
        "0",
        "-1",
        "qwerty",
      ],
      shouldNotCallOnChange: [""],
    },
  },
  {
    callbackName: "onSpeedChange",
    labelText: "Обновлений в секунду:",
    testValues: {
      shouldCallOnChange: ["1", "10", "100", "1000", "0.1"],
      shouldNotCallOnChange: ["-1", "0", "", "qwerty"],
    },
  },
];

describe("form tests", () => {
  it("should render form", () => {
    const { asFragment } = render(<Form />);

    const form: HTMLFormElement = screen.getByTestId("field-form");

    expect(form).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cellSize input", () => {
    const { asFragment } = render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText("Размер ячейки:");

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render capacity-percentage input", () => {
    const { asFragment } = render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText(
      "Процент заполненности:"
    );

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render width input", () => {
    const { asFragment } = render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText("Макс. ширина:");

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render height input", () => {
    const { asFragment } = render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText("Макс. высота:");

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render speed-change", () => {
    const { asFragment } = render(<Form />);

    const input = screen.getByLabelText("Обновлений в секунду:");

    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render start button", () => {
    const { asFragment } = render(<Form />);

    const button: HTMLButtonElement = screen.getByText("Старт");

    expect(button).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render stop button", () => {
    const { asFragment } = render(<Form />);

    const button: HTMLButtonElement = screen.getByText("Стоп");

    expect(button).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render reset button", () => {
    const { asFragment } = render(<Form />);

    const button: HTMLButtonElement = screen.getByText("Сброс");

    expect(button).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("isValidNumericString should return valid results", () => {
    expect(isValidNumericString("1.5")).toBe(true);
    expect(isValidNumericString("1,5")).toBe(false);
    expect(isValidNumericString("q23")).toBe(false);
    expect(isValidNumericString("")).toBe(false);
    expect(isValidNumericString("4")).toBe(true);
  });
});

describe("input onChange tests", () => {
  inputsData.forEach((field) => {
    field.testValues.shouldCallOnChange.forEach((validTestValue) => {
      it(`should call ${field.callbackName} in ${Form.inputDelay} ms for valid input ${validTestValue}`, async () => {
        const callback = jest.fn();

        render(<Form {...{ [field.callbackName]: callback }} />);

        const input: HTMLInputElement = screen.getByLabelText(field.labelText);

        userEvent.clear(input);
        userEvent.type(input, validTestValue);
        await waitFor(
          () => {
            expect(callback).toHaveBeenCalledTimes(1);
          },
          {
            timeout: Form.inputDelay + 100,
          }
        );
      });
    });

    field.testValues.shouldNotCallOnChange.forEach(async (invalidTestValue) => {
      await it(`should not call ${field.callbackName} for invalid input ${invalidTestValue}`, () => {
        const callback = jest.fn();

        render(<Form {...{ [field.callbackName]: callback }} />);
        const input: HTMLInputElement = screen.getByLabelText(field.labelText);

        userEvent.clear(input);
        userEvent.type(input, invalidTestValue);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              expect(callback).toHaveBeenCalledTimes(0);
              resolve(true);
            } catch (e) {
              reject(e);
            }
          }, Form.inputDelay + 100);
        });
      });
    });
  });
});

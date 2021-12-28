import React from "react";
import userEvent from "@testing-library/user-event/dist";
import { render, screen, waitFor } from "@testing-library/react";
import { Form } from "./Form";
import { l10n } from "@/l10n/ru";

const inputsData = [
  {
    callbackName: "onCellSizeChange",
    labelText: l10n.cellSizeLabel,
    testValues: {
      shouldCallOnChange: ["10", "100", "1000"],
      shouldNotCallOnChange: ["1", "9", "-1", "", "0"],
    },
  },
  {
    callbackName: "onMaxFieldWidthChange",
    labelText: l10n.maxWidthLabel,
    testValues: {
      shouldCallOnChange: ["1", "10", "100", "1000", "0"],
      shouldNotCallOnChange: ["-1", "", "qwerty"],
    },
  },
  {
    callbackName: "onMaxFieldHeightChange",
    labelText: l10n.maxHeightLabel,
    testValues: {
      shouldCallOnChange: ["1", "10", "100", "1000", "0"],
      shouldNotCallOnChange: ["-1", "", "qwerty"],
    },
  },
  {
    callbackName: "onCapacityChange",
    labelText: l10n.capacityLabel,
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
    labelText: l10n.speedLabel,
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
    render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText(l10n.cellSizeLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render capacity-percentage input", () => {
    render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText(l10n.capacityLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render width input", () => {
    render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxWidthLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render height input", () => {
    render(<Form />);

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxHeightLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render speed-change", () => {
    render(<Form />);

    const input = screen.getByLabelText(l10n.speedLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render start button", () => {
    render(<Form />);

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStart);

    expect(button).toBeInTheDocument();
  });

  it("should render stop button", () => {
    render(<Form />);

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStop);

    expect(button).toBeInTheDocument();
  });

  it("should render reset button", () => {
    render(<Form />);

    const button: HTMLButtonElement = screen.getByText(l10n.buttonReset);

    expect(button).toBeInTheDocument();
  });
});

describe("input onChange tests", () => {
  const originalInputDelay = Form.inputDelay;

  beforeAll(() => {
    Form.inputDelay = 100;
  });

  afterAll(() => {
    Form.inputDelay = originalInputDelay;
  });

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

describe("buttons tests", () => {
  it("should run onStart", () => {
    const onStart = jest.fn();

    render(<Form onStart={onStart} />);

    const buttonStart: HTMLButtonElement = screen.getByText(l10n.buttonStart);

    userEvent.click(buttonStart);

    expect(onStart).toHaveBeenCalled();
  });

  it("should run onStop", () => {
    const onStop = jest.fn();

    render(<Form onStop={onStop} />);

    const buttonStop: HTMLButtonElement = screen.getByText(l10n.buttonStop);

    userEvent.click(buttonStop);

    expect(onStop).toHaveBeenCalled();
  });

  it("should run onReset", () => {
    const onReset = jest.fn();

    render(<Form onReset={onReset} />);

    const buttonReset: HTMLButtonElement = screen.getByText(l10n.buttonReset);

    userEvent.click(buttonReset);

    expect(onReset).toHaveBeenCalled();
  });
});

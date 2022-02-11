import React from "react";
import userEvent from "@testing-library/user-event/dist";
import { render, screen } from "@/utils/test-utils";
import { FormContainer } from "./FormContainer";
import { l10n } from "@/l10n/ru";

const initialState = {
  fieldControl: {
    cellSize: 40,
    maxFieldWidth: 600,
    maxFieldHeight: 400,
    capacity: 50,
    speed: 1,
  },
};
describe("form tests", () => {
  it("should render form", () => {
    const { asFragment } = render(<FormContainer />, {
      preloadedState: initialState,
    });

    const form: HTMLFormElement = screen.getByTestId("field-form");

    expect(form).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cellSize input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.cellSizeLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render capacity-percentage input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.capacityLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render width input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxWidthLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render height input", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input: HTMLInputElement = screen.getByLabelText(l10n.maxHeightLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render speed-change", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const input = screen.getByLabelText(l10n.speedLabel);

    expect(input).toBeInTheDocument();
  });

  it("should render start button", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStart);

    expect(button).toBeInTheDocument();
  });

  it("should render stop button", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStop);

    expect(button).toBeInTheDocument();
  });

  it("should render reset button", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(l10n.buttonReset);

    expect(button).toBeInTheDocument();
  });

  it("should render generateRandom button", () => {
    render(<FormContainer />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(
      l10n.buttonGenerateRandom
    );

    expect(button).toBeInTheDocument();
  });
});

describe("buttons tests", () => {
  it("should run onStart", () => {
    const onStart = jest.fn();

    render(<FormContainer onButtonClickFn={onStart} />, {
      preloadedState: initialState,
    });

    const buttonStart: HTMLButtonElement = screen.getByText(l10n.buttonStart);

    userEvent.click(buttonStart);

    expect(onStart).toHaveBeenCalled();
  });

  it("should run onStop", () => {
    const onStop = jest.fn();

    render(<FormContainer onButtonClickFn={onStop} />, {
      preloadedState: initialState,
    });

    const buttonStop: HTMLButtonElement = screen.getByText(l10n.buttonStop);

    userEvent.click(buttonStop);

    expect(onStop).toHaveBeenCalled();
  });

  it("should run onReset", () => {
    const onReset = jest.fn();

    render(<FormContainer onButtonClickFn={onReset} />, {
      preloadedState: initialState,
    });

    const buttonReset: HTMLButtonElement = screen.getByText(l10n.buttonReset);

    userEvent.click(buttonReset);

    expect(onReset).toHaveBeenCalled();
  });

  it("should run onGenerateRandom", () => {
    const onGenerateRandom = jest.fn();

    render(<FormContainer onButtonClickFn={onGenerateRandom} />, {
      preloadedState: initialState,
    });

    const button: HTMLButtonElement = screen.getByText(
      l10n.buttonGenerateRandom
    );

    userEvent.click(button);

    expect(onGenerateRandom).toHaveBeenCalled();
  });
});

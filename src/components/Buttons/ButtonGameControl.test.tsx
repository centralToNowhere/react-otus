import React from "react";
import { render, screen } from "@testing-library/react";
import { l10n } from "@/l10n/ru";
import { ButtonGameControl } from "@/components/Buttons/ButtonGameControl";

describe("Button tests", () => {
  it("should render start button", () => {
    render(
      <ButtonGameControl
        type={"button"}
        name={"startButton"}
        onClick={() => {
          // empty function
        }}
        content={l10n.buttonStart}
      />
    );

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStart);

    expect(button).toBeInTheDocument();
  });

  it("should render stop button", () => {
    render(
      <ButtonGameControl
        type={"button"}
        name={"stopButton"}
        onClick={() => {
          // empty function
        }}
        content={l10n.buttonStop}
      />
    );

    const button: HTMLButtonElement = screen.getByText(l10n.buttonStop);

    expect(button).toBeInTheDocument();
  });

  it("should render reset button", () => {
    render(
      <ButtonGameControl
        type={"reset"}
        name={"resetButton"}
        onClick={() => {
          // empty function
        }}
        content={l10n.buttonReset}
      />
    );

    const button: HTMLButtonElement = screen.getByText(l10n.buttonReset);

    expect(button).toBeInTheDocument();
  });
});

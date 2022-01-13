import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { App } from "./App";
import { l10n } from "@/l10n/ru";
import userEvent from "@testing-library/user-event/dist";

describe("index tests", () => {
  it("should render App", () => {
    render(<App />);
    const fieldContainer = screen.getByTestId("react-lifecycle");

    expect(fieldContainer).toBeInTheDocument();
  });

  it("should render registration screen", () => {
    render(<App />);

    const field = screen.queryByTestId("field");
    expect(field).not.toBeInTheDocument();

    const form = screen.queryByTestId("field-form");
    expect(form).not.toBeInTheDocument();

    const gameHeading: HTMLHeadingElement = screen.getByText(l10n.gameHeading);
    expect(gameHeading).toBeInTheDocument();
  });

  it("should render main screen", async () => {
    render(<App />);

    const playerNameInput: HTMLInputElement = screen.getByLabelText("playerName");
    const gameStartButton: HTMLButtonElement = screen.getByText(l10n.buttonStartGameAsPlayer);

    userEvent.type(playerNameInput, "Ivan");
    userEvent.click(gameStartButton);

    await screen.findByTestId("field");
    await screen.findByTestId("field-form");

    await waitFor(() => {
      expect(screen.queryByText(l10n.gameHeading)).toBe(null);
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { l10n } from "@/l10n/ru";
import userEvent from "@testing-library/user-event/dist";
import React, { FC, useReducer } from "react";
import { AppRouter, AppRouterProps } from "@/routes/AppRouter";
import { AppReducer, initialState } from "@/state";
import { MemoryRouter } from "react-router-dom";

const AppRouterForTesting: FC<Partial<Omit<AppRouterProps, "dispatch">>> = (
  props
) => {
  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
    ...props,
  });

  return (
    <MemoryRouter initialEntries={["/"]}>
      <AppRouter {...state} dispatch={dispatch} />
    </MemoryRouter>
  );
};

describe("Routes tests", () => {
  it("should render registration screen", () => {
    render(<AppRouterForTesting />);

    const field = screen.queryByTestId("field");
    expect(field).not.toBeInTheDocument();

    const form = screen.queryByTestId("field-form");
    expect(form).not.toBeInTheDocument();

    const gameHeading: HTMLHeadingElement = screen.getByText(l10n.gameHeading);
    expect(gameHeading).toBeInTheDocument();
  });

  it("should render main screen after player register", async () => {
    render(<AppRouterForTesting />);

    const playerNameInput: HTMLInputElement = screen.getByLabelText(
      l10n.registerPlayerLabel
    );
    const gameStartButton: HTMLButtonElement = screen.getByText(
      l10n.buttonStartGameAsPlayer
    );

    userEvent.type(playerNameInput, "Ivan");
    userEvent.click(gameStartButton);

    await screen.findByTestId("field");
    await screen.findByTestId("field-form");

    await waitFor(() => {
      expect(screen.queryByText(l10n.gameHeading)).toBe(null);
    });
  });

  it("should render registration screen after player unregister", async () => {
    render(
      <AppRouterForTesting
        player={{
          registered: true,
          name: "Vladimir",
        }}
      />
    );

    const unregisterButton = screen.getByText(l10n.logoutButton);

    userEvent.click(unregisterButton);

    await screen.findByLabelText(l10n.registerPlayerLabel);
    await screen.findByText(l10n.buttonStartGameAsPlayer);

    await waitFor(() => {
      expect(screen.queryByTestId("field")).toBe(null);
    });
  });
});

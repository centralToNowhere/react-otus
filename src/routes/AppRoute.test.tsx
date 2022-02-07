import { render, screen, waitFor } from "@/utils/test-utils";
import { l10n } from "@/l10n/ru";
import userEvent from "@testing-library/user-event/dist";
import React from "react";
import { AppRouter } from "@/routes/AppRouter";
import { MemoryRouter } from "react-router-dom";

describe("Routes tests", () => {
  it("should render registration screen", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>,
      {
        preloadedState: {},
      }
    );

    const field = screen.queryByTestId("field");
    expect(field).not.toBeInTheDocument();

    const form = screen.queryByTestId("field-form");
    expect(form).not.toBeInTheDocument();

    const gameHeading: HTMLHeadingElement = screen.getByText(
      `${l10n.gameHeadingPart1}`
    );
    expect(gameHeading).toBeInTheDocument();
  });

  it("should render main screen after player register", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>,
      {
        preloadedState: {
          auth: {
            player: {
              name: "",
              registered: false,
            },
            loginPending: false,
          },
        },
      }
    );

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
      expect(screen.queryByText(`${l10n.gameHeadingPart1}`)).toBe(null);
    });
  });

  it("should render registration screen after player unregister", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>,
      {
        preloadedState: {
          auth: {
            player: {
              name: "Player1",
              registered: true,
            },
            loginPending: false,
          },
        },
      }
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

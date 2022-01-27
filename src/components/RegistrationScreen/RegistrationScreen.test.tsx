import React from "react";
import { render, screen, waitFor } from "@/utils/test-utils";
import { RegistrationScreen } from "./RegistrationScreen";
import { l10n } from "@/l10n/ru";
import * as ReactRouter from "react-router-dom";

describe("Registration screen tests", () => {
  it("should render registration screen", () => {
    const { asFragment } = render(
      <ReactRouter.MemoryRouter initialEntries={["/"]}>
        <RegistrationScreen />
      </ReactRouter.MemoryRouter>,
      {
        preloadedState: {
          auth: {
            player: {
              name: "Player23",
              registered: true,
            },
            loginPending: false,
          },
        },
      }
    );

    const header: HTMLHeadingElement = screen.getByText(
      `${l10n.gameHeadingPart1}`
    );
    const playerNameInput: HTMLInputElement = screen.getByLabelText(
      l10n.registerPlayerLabel
    );
    const gameStartButton: HTMLButtonElement = screen.getByText(
      l10n.buttonStartGameAsPlayer
    );

    expect(playerNameInput).toBeInTheDocument();
    expect(gameStartButton).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("if player already registered, should show his name as input's initial value", async () => {
    render(
      <ReactRouter.MemoryRouter initialEntries={["/"]}>
        <RegistrationScreen />
      </ReactRouter.MemoryRouter>,
      {
        preloadedState: {
          auth: {
            player: {
              name: "Player23",
              registered: true,
            },
            loginPending: false,
          },
        },
      }
    );

    const playerNameInput: HTMLInputElement = screen.getByLabelText(
      l10n.registerPlayerLabel
    );

    await waitFor(() => {
      expect(playerNameInput.value).toBe("Player23");
    });
  });
});

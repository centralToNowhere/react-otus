import React, { FC } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  IRegistrationScreenProps,
  RegistrationScreen,
} from "./RegistrationScreen";
import { l10n } from "@/l10n/ru";
import { defaultPlayer } from "@/state/AppReducer";

import userEvent from "@testing-library/user-event/dist";

const RegistrationScreenTest: FC<IRegistrationScreenProps> = (props) => {
  const onPlayerRegistration = props.onPlayerRegistration;

  return (
    <RegistrationScreen
      player={props.player}
      onPlayerRegistration={onPlayerRegistration}
    />
  );
};

describe("Registration screen tests", () => {
  it("should render registration screen", () => {
    const { asFragment } = render(
      <RegistrationScreenTest player={defaultPlayer} />
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
      <RegistrationScreenTest
        player={{
          registered: true,
          name: "Konstantin",
        }}
      />
    );

    const playerNameInput: HTMLInputElement = screen.getByLabelText(
      l10n.registerPlayerLabel
    );

    await waitFor(() => {
      expect(playerNameInput.value).toBe("Konstantin");
    });
  });

  it("should call onPlayerRegistration callback on button click", async () => {
    const callback = jest.fn();

    render(
      <RegistrationScreenTest
        onPlayerRegistration={callback}
        player={defaultPlayer}
      />
    );

    const gameStartButton: HTMLButtonElement = screen.getByText(
      l10n.buttonStartGameAsPlayer
    );

    userEvent.click(gameStartButton);

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it("should call onPlayerRegistration callback on button enter", async () => {
    const callback = jest.fn();

    render(
      <RegistrationScreenTest
        onPlayerRegistration={callback}
        player={defaultPlayer}
      />
    );

    const gameStartButton: HTMLButtonElement = screen.getByText(
      l10n.buttonStartGameAsPlayer
    );

    userEvent.type(gameStartButton, "{enter}");

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  it("should call onPlayerRegistration callback on enter keydown", async () => {
    const callback = jest.fn();

    render(
      <RegistrationScreenTest
        onPlayerRegistration={callback}
        player={defaultPlayer}
      />
    );

    const playerNameInput: HTMLInputElement = screen.getByLabelText(
      l10n.registerPlayerLabel
    );

    userEvent.type(playerNameInput, "{enter}");

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

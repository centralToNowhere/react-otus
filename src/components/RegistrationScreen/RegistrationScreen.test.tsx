import React, { FC, useReducer } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  IRegistrationScreenProps,
  RegistrationScreen,
} from "./RegistrationScreen";
import { l10n } from "@/l10n/ru";
import {
  AppReducer,
  defaultPlayer,
  IAppState,
  initialState,
} from "@/state/AppReducer";

import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event/dist";
import { usePlayerRegistration, storageKeyPlayerName } from "@/auth/Auth";

const RegistrationScreenWithDispatch: FC<IRegistrationScreenProps> = (
  props
) => {
  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
    player: props.player,
  } as IAppState);

  const onPlayerRegistration = props.onPlayerRegistration
    ? props.onPlayerRegistration
    : //eslint-disable-next-line react-hooks/rules-of-hooks
      usePlayerRegistration(state.player, dispatch);

  return (
    <BrowserRouter>
      <RegistrationScreen
        player={state.player}
        onPlayerRegistration={onPlayerRegistration}
      />
    </BrowserRouter>
  );
};

describe("Registration screen tests", () => {
  it("should render registration screen", () => {
    const { asFragment } = render(
      <RegistrationScreenWithDispatch player={defaultPlayer} />
    );

    const header: HTMLHeadingElement = screen.getByText(l10n.gameHeading);
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
      <RegistrationScreenWithDispatch
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
      <RegistrationScreenWithDispatch
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
      <RegistrationScreenWithDispatch
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

  it("should save player data to localStorage after player registration", async () => {
    const storageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const player = {
      registered: true,
      name: "Konstantin",
    };

    render(<RegistrationScreenWithDispatch player={defaultPlayer} />);

    const playerNameInput: HTMLInputElement = screen.getByLabelText(
      l10n.registerPlayerLabel
    );
    const gameStartButton: HTMLButtonElement = screen.getByText(
      l10n.buttonStartGameAsPlayer
    );

    userEvent.type(playerNameInput, "Konstantin");
    userEvent.click(gameStartButton);

    await waitFor(() => {
      expect(storageSetItemSpy).toHaveBeenCalledWith(
        storageKeyPlayerName,
        JSON.stringify(player)
      );
    });
  });

  it("should not render game field if player name not set", async () => {
    render(<RegistrationScreenWithDispatch player={defaultPlayer} />);

    const gameStartButton: HTMLButtonElement = screen.getByText(
      l10n.buttonStartGameAsPlayer
    );

    userEvent.click(gameStartButton);

    const field = screen.queryByTestId("field");

    await waitFor(() => {
      expect(field).toBe(null);
    });
  });
});

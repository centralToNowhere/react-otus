import React, { FC } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist";
import {IPlayer, PlayerStorageData} from "@/player/Player";
import { SetPlayerAction } from "@/store/actions";
import * as ReactRouter from "react-router-dom";
import { usePlayerRegistration } from "@/auth/Auth";
import { routeNames } from "@/routes/routeNames";
import {getPlayerDataFromStorage, storageKey} from "@/storage/Storage";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(jest.fn),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

const DummyComponent: FC = (props) => {
  const [player, onPlayerRegister] = usePlayerRegistration();

  return (
    <Provider store={store}>
      <button
        type="button"
        onClick={() => {
          onPlayerRegister("Oleg");
        }}
      >
        Dispatch
      </button>
      <span>{player.name}</span>
    </Provider>
  );
};

describe("Auth tests", () => {
  it("should change player name on register", async () => {
    render(
      <Provider store={store}>
        <ReactRouter.MemoryRouter initialEntries={["/"]}>
          <DummyComponent/>
        </ReactRouter.MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Oleg")).toBeInTheDocument();
    });
  });

  it("should save player to localstorage", async () => {
    render(
      <Provider store={store}>
        <ReactRouter.MemoryRouter initialEntries={["/"]}>
          <DummyComponent/>
        </ReactRouter.MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      const playerData = getPlayerDataFromStorage()
      expect(playerData).toHaveProperty(
        "player.name", "Oleg"
      );
      expect(playerData).toHaveProperty(
        "player.registered", true
      );
    });
  });

  it("should call navigate with args", async () => {
    const navigate = jest.fn();

    jest.spyOn(ReactRouter, "useNavigate").mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <ReactRouter.MemoryRouter initialEntries={["/"]}>
          <DummyComponent/>
        </ReactRouter.MemoryRouter>
      </Provider>
  );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(routeNames.game, {
        replace: true,
      });
    });

    jest.spyOn(ReactRouter, "useNavigate").mockRestore();
  });
});

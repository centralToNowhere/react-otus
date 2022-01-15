import React, { FC } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist";
import { IPlayer, SetPlayerAction } from "@/state/actions";
import * as ReactRouter from "react-router-dom";
import { storageKeyPlayerName, usePlayerRegistration } from "@/auth/Auth";
import { routeNames } from "@/routes/routeNames";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(jest.fn),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

const DummyComponent: FC<{
  player: IPlayer;
  dispatch: () => void;
}> = (props) => {
  const onPlayerRegister = usePlayerRegistration(props.player, props.dispatch);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onPlayerRegister("Oleg");
        }}
      >
        Dispatch
      </button>
    </>
  );
};

describe("Auth tests", () => {
  it("should call onPlayerRegister", async () => {
    const dispatch = jest.fn();
    render(
      <ReactRouter.MemoryRouter initialEntries={["/"]}>
        <DummyComponent
          player={{
            registered: true,
            name: "Oleg",
          }}
          dispatch={dispatch}
        />
      </ReactRouter.MemoryRouter>
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        SetPlayerAction({
          registered: true,
          name: "Oleg",
        })
      );
    });
  });

  it("should save player to localstorage", async () => {
    const dispatch = jest.fn();
    const storageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");
    render(
      <ReactRouter.MemoryRouter initialEntries={["/"]}>
        <DummyComponent
          player={{
            registered: true,
            name: "Oleg",
          }}
          dispatch={dispatch}
        />
      </ReactRouter.MemoryRouter>
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(storageSetItemSpy).toHaveBeenCalledWith(
        storageKeyPlayerName,
        JSON.stringify({
          registered: true,
          name: "Oleg",
        })
      );
    });
  });

  it("should call navigate with args", async () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();

    jest.spyOn(ReactRouter, "useNavigate").mockReturnValue(navigate);

    render(
      <ReactRouter.MemoryRouter initialEntries={["/"]}>
        <DummyComponent
          player={{
            registered: true,
            name: "Oleg",
          }}
          dispatch={dispatch}
        />
      </ReactRouter.MemoryRouter>
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(routeNames.game, {
        replace: true,
      });
    });
  });
});

import React, { FC } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist";
import * as ReactRouter from "react-router-dom";
import { usePlayerRegistration } from "@/auth/Auth";
import { routeNames } from "@/routes/routeNames";
import {
  getPlayerDataFromStorage,
  persistPlayerDataMiddleware,
} from "@/storage/Storage";
import { Provider } from "react-redux";
import { AnyAction } from "redux";
import { authSlice, IAuthState, login, logout } from "@/auth";
import { configureStore, EnhancedStore, ThunkDispatch } from "@reduxjs/toolkit";

let store: EnhancedStore;
let dispatch: ThunkDispatch<IAuthState, unknown, AnyAction>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(jest.fn),
}));

beforeAll(() => {
  store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(persistPlayerDataMiddleware);
    },
  });
  dispatch = store.dispatch;
});

afterAll(() => {
  jest.restoreAllMocks();
});

const DummyComponent: FC = () => {
  const [player, onPlayerRegister] = usePlayerRegistration();

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
      <span>{player.name}</span>
    </>
  );
};

describe("Auth tests", () => {
  it("should change player name on register", async () => {
    render(
      <Provider store={store}>
        <ReactRouter.MemoryRouter initialEntries={["/"]}>
          <DummyComponent />
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
          <DummyComponent />
        </ReactRouter.MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.click(button);

    await waitFor(() => {
      const playerData = getPlayerDataFromStorage();
      expect(playerData).toHaveProperty("player.name", "Oleg");
    });

    await waitFor(() => {
      const playerData = getPlayerDataFromStorage();
      expect(playerData).toHaveProperty("player.registered", true);
    });
  });

  it("should call navigate with args", async () => {
    const navigate = jest.fn();

    jest.spyOn(ReactRouter, "useNavigate").mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <ReactRouter.MemoryRouter initialEntries={["/"]}>
          <DummyComponent />
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

  describe("AuthSlice actions test", () => {
    it("login: should change state correctly", async () => {
      dispatch(login("James"));

      await waitFor(() => {
        expect(store.getState().auth.player).toEqual({
          name: "James",
          registered: true,
        });
      });
    });

    it("logout: should change state correctly", () => {
      dispatch(logout());

      expect(store.getState().auth.player).toEqual({
        name: "",
        registered: false,
      });
    });
  });
});

import React, { FC } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist";
import * as ReactRouter from "react-router-dom";
import { usePlayerRegistration } from "@/auth/Auth";
import { routeNames } from "@/routes/routeNames";
import { getDataFromStorage, storageKey } from "@/storage";
import { Provider } from "react-redux";
import { AnyAction } from "redux";
import { configureStore, EnhancedStore, ThunkDispatch } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { authSlice, IAuthState, login, logout } from "@/auth";
import { authSaga } from "@/auth/AuthRdx";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(jest.fn),
}));

const sageMiddleware = createSagaMiddleware();
const store: EnhancedStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sageMiddleware);
  },
  preloadedState: {
    auth: {
      player: {
        registered: true,
        name: "Player1",
      },
      loginPending: false,
      loginError: "",
    },
  },
});
const dispatch: ThunkDispatch<IAuthState, unknown, AnyAction> = store.dispatch;

sageMiddleware.run(function* () {
  yield fork(authSaga);
});

beforeEach(() => {
  localStorage.removeItem(storageKey);
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
      <span aria-label={"playerName"}>{player.name}</span>
      <span aria-label={"playerRegistered"}>{String(player.registered)}</span>
    </>
  );
};

describe("Auth tests", () => {
  it("should load player data from store", () => {
    render(
      <Provider store={store}>
        <ReactRouter.MemoryRouter initialEntries={["/"]}>
          <DummyComponent />
        </ReactRouter.MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText("playerName")).toHaveTextContent("Player1");
    expect(screen.getByLabelText("playerRegistered")).toHaveTextContent("true");
  });

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
      const playerData = getDataFromStorage();
      expect(playerData).toHaveProperty("player.name", "Oleg");
    });

    await waitFor(() => {
      const playerData = getDataFromStorage();
      expect(playerData).toHaveProperty("player.registered", true);
    });
  });

  it("should clear player from localstorage on logout", async () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        player: {
          registered: true,
          name: "Player3",
        },
        prop: "name",
        someData: {
          test: "test",
        },
      })
    );

    render(
      <Provider store={store}>
        <ReactRouter.MemoryRouter initialEntries={["/"]}>
          <DummyComponent />
        </ReactRouter.MemoryRouter>
      </Provider>
    );

    dispatch(logout());

    await waitFor(() => {
      expect(getDataFromStorage()).not.toHaveProperty("player");
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
        expect(store.getState().auth).toEqual(
          expect.objectContaining({
            player: {
              name: "James",
              registered: true,
            },
          })
        );
      });
    });

    it("logout: should change state correctly", () => {
      dispatch(logout());

      expect(store.getState().auth).toEqual(
        expect.objectContaining({
          player: {
            name: "",
            registered: false,
          },
        })
      );
    });
  });
});

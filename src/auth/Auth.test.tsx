import React, { FC } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/dist";
import * as ReactRouter from "react-router-dom";
import { usePlayerRegistration } from "@/auth/Auth";
import { routeNames } from "@/routes/routeNames";
import {
  clearPlayerData,
  getDataFromStorage,
  persistPlayer,
  selectPlayerData,
  storageKey,
} from "@/storage";
import { Provider } from "react-redux";
import { AnyAction } from "redux";
import { configureStore, EnhancedStore, ThunkDispatch } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import {
  authSlice,
  IAuthState,
  login,
  loginFailed,
  loginSucceed,
  logout,
} from "@/auth";
import {
  authSaga,
  onLogin,
  registerPlayer,
  selectPlayerName,
} from "@/auth/AuthRdx";
import { IPlayer } from "@/player/Player";

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
        expect(store.getState().auth).toEqual({
          player: {
            name: "James",
            registered: true,
          },
          loginPending: false,
        });
      });
    });

    it("logout: should change state correctly", () => {
      dispatch(logout());

      expect(store.getState().auth).toEqual({
        player: {
          name: "",
          registered: false,
        },
        loginPending: false,
      });
    });
  });

  describe("saga tests", () => {
    it("should run authSaga", () => {
      const gen = authSaga();

      expect(gen.next().value).toEqual(
        takeEvery(loginSucceed.type, persistPlayer)
      );
      expect(gen.next().value).toEqual(
        takeEvery([logout.type, loginFailed.type], clearPlayerData)
      );
      expect(gen.next().value).toEqual(takeEvery(login.type, onLogin));
    });

    it("should run persistPlayer", () => {
      const expectedPlayer: IPlayer = {
        registered: true,
        name: "Vladimir",
      };

      const gen = persistPlayer();

      expect(gen.next().value).toEqual(select(selectPlayerData));
      gen.next(expectedPlayer);
      expect(getDataFromStorage()?.player).toEqual(expectedPlayer);
    });

    it("should run onLogin", () => {
      const playerName = "Player888";
      const registeredPlayer = {
        registered: true,
        name: "Registered",
      };
      const unregisteredPlayer = {
        registered: false,
        name: "",
      };

      const gen = cloneableGenerator(onLogin)();

      expect(gen.next().value).toEqual(select(selectPlayerName));
      expect(gen.next(playerName).value).toEqual(
        call(registerPlayer, playerName)
      );
      expect(gen.clone().next(registeredPlayer).value).toEqual(
        put(loginSucceed(registeredPlayer))
      );
      expect(gen.clone().next(unregisteredPlayer).value).toEqual(
        put(loginFailed())
      );
    });
  });
});

import {
  authSlice,
  login,
  logout,
  loginSucceed,
  loginFailed,
} from "@/auth/slice";
import { waitFor } from "@testing-library/react";
import { IAuthState, LoginError } from "@/auth/Auth";

const initialState: IAuthState = {
  player: {
    registered: false,
    name: "",
  },
  loginPending: false,
  loginError: "",
};

describe("AuthSlice actions test", () => {
  it("login", async () => {
    const resultState = authSlice.reducer(initialState, login("James"));

    await waitFor(() => {
      expect(resultState).toEqual(
        expect.objectContaining({
          player: {
            name: "James",
            registered: false,
          },
          loginPending: true,
          loginError: "",
        })
      );
    });
  });

  it("logout", () => {
    const resultState = authSlice.reducer(initialState, logout());

    expect(resultState).toEqual(
      expect.objectContaining({
        player: {
          registered: false,
          name: "",
        },
        loginPending: false,
        loginError: "",
      })
    );
  });

  it("loginSucceed", () => {
    const player = {
      registered: true,
      name: "Player3",
    };
    const resultState = authSlice.reducer(initialState, loginSucceed(player));

    expect(resultState).toEqual(
      expect.objectContaining({
        player,
        loginPending: false,
        loginError: "",
      })
    );
  });

  it("loginFailed", () => {
    const loginError = new Error("loginFailed") as LoginError;
    const resultState = authSlice.reducer(
      initialState,
      loginFailed(loginError)
    );

    expect(resultState).toEqual(
      expect.objectContaining({
        player: {
          registered: false,
          name: "",
        },
        loginPending: false,
        loginError: "loginFailed",
      })
    );
  });
});

import { combineReducers } from "redux";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import {
  authSaga,
  authSlice,
  logout,
  login,
  loginFailed,
  loginSucceed,
  PlayerNameNotSetError,
  PlayerNotRegisteredError,
  registerPlayer,
} from "@/auth/AuthRdx";
import { IPlayer } from "@/player/Player";
import { getDataFromStorage, setDataToStorage } from "@/storage";
import { clearStorage } from "@/storage/Storage";

describe("authSaga tests", () => {
  it("login succeed", () => {
    const player: IPlayer = {
      registered: true,
      name: "Player43",
    };
    return expectSaga(authSaga)
      .withReducer(
        combineReducers({
          auth: authSlice.reducer,
        })
      )
      .provide([[matchers.call.fn(registerPlayer), player]])
      .call(setDataToStorage, {
        ...getDataFromStorage(),
        player: player,
      })
      .put(loginSucceed(player))
      .dispatch(login("Player43"))
      .hasFinalState({
        auth: {
          player,
          loginPending: false,
          loginError: "",
        },
      })
      .run();
  });

  it("login failed: not registered", () => {
    const player: IPlayer = {
      registered: false,
      name: "Player43",
    };

    return expectSaga(authSaga)
      .withReducer(
        combineReducers({
          auth: authSlice.reducer,
        })
      )
      .provide([[matchers.call.fn(registerPlayer), player]])
      .call(clearStorage, "player")
      .put(loginFailed(PlayerNotRegisteredError))
      .dispatch(login("Player43"))
      .hasFinalState({
        auth: {
          player: {
            registered: false,
            name: "",
          },
          loginPending: false,
          loginError: PlayerNotRegisteredError.message,
        },
      })
      .run();
  });

  it("login failed: player name not specified", () => {
    return expectSaga(authSaga)
      .withReducer(
        combineReducers({
          auth: authSlice.reducer,
        })
      )
      .provide([
        [
          matchers.call.fn(registerPlayer),
          Promise.reject(PlayerNameNotSetError),
        ],
      ])
      .call(clearStorage, "player")
      .put(loginFailed(PlayerNameNotSetError))
      .dispatch(login(""))
      .hasFinalState({
        auth: {
          player: {
            registered: false,
            name: "",
          },
          loginPending: false,
          loginError: PlayerNameNotSetError.message,
        },
      })
      .run();
  });

  it("logout", () => {
    return expectSaga(authSaga)
      .withReducer(
        combineReducers({
          auth: authSlice.reducer,
        })
      )
      .call(clearStorage, "player")
      .dispatch(logout())
      .run();
  });
});

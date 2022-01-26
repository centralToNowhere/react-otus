import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {defaultPlayer, IPlayer} from "@/player/Player";
import {RootState} from "@/store/redux/store";
import {getPlayerDataFromStorage} from "@/storage/Storage";

export interface IAuthState {
  player: IPlayer,
  loginPending: boolean
}

const playerDataFromStorage = getPlayerDataFromStorage();

const initialState: IAuthState = {
  player: playerDataFromStorage?.player || defaultPlayer,
  loginPending: false
};

export const login = createAsyncThunk<IPlayer, string>(
  "auth/login",
  (playerName, thunkAPI) => {
    return new Promise<IPlayer>((resolve, reject) => {
      setTimeout(() => {
        if (playerName) {
          resolve({
            registered: true,
            name: playerName
          });
        }
      }, 500);
    });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState
  },
  reducers: {
    logout: (state) => {
      state.player.registered = false;
      state.player.name = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.player.registered = false;
      state.loginPending = true;
      state.player.name = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.player.registered = action.payload.registered;
      state.loginPending = false;
      state.player.name = action.payload.name;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.player.registered = false;
      state.loginPending = false;
      state.player.name = "";
    });
  }
});

const selectAuth = (state: RootState) => {
  return state.auth;
}

export const selectPlayer = createSelector(
  selectAuth,
  (auth: IAuthState) => auth.player
);

export const selectLoginPending = createSelector(
  selectAuth,
  (auth: IAuthState) => auth.loginPending
);

export const { logout } = authSlice.actions;
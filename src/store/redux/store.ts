import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import { gameFieldSlice } from "@/components/GameField";
import { fieldControlSlice } from "@/components/Fields";
import { authSlice } from "@/auth";
import {persistPlayerDataMiddleware} from "@/storage/Storage";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    gameField: gameFieldSlice.reducer,
    fieldControl: fieldControlSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(persistPlayerDataMiddleware)
  }
});

export const initialStateAll = {
  auth: authSlice.getInitialState(),
  fieldControl: fieldControlSlice.getInitialState(),
  gameField: gameFieldSlice.getInitialState()
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
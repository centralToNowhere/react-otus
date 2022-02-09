import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { gameFieldSlice } from "@/components/GameField";
import { fieldControlSlice, fieldControlSaga } from "@/components/Fields";
import { authSlice, authSaga } from "@/auth";

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* () {
  yield fork(fieldControlSaga);
  yield fork(authSaga);
};

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    gameField: gameFieldSlice.reducer,
    fieldControl: fieldControlSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export const initialStateAll = {
  auth: authSlice.getInitialState(),
  fieldControl: fieldControlSlice.getInitialState(),
  gameField: gameFieldSlice.getInitialState(),
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
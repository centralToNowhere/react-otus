import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { gameFieldSlice } from "@/components/GameField";
import { fieldControlSlice, fieldControlSaga } from "@/components/Fields";
import { authSlice, authSaga } from "@/auth";
import { figurePaletteSlice } from "@/components/FigurePalette";
import { gameSaga } from "@/screens/Game/saga";

const sagaMiddleware = createSagaMiddleware();

export const rootSaga = function* () {
  yield fork(fieldControlSaga);
  yield fork(authSaga);
  yield fork(gameSaga);
};

export const RootReducer = {
  auth: authSlice.reducer,
  gameField: gameFieldSlice.reducer,
  fieldControl: fieldControlSlice.reducer,
  figurePalette: figurePaletteSlice.reducer,
};

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export const initialStateAll = {
  auth: authSlice.getInitialState(),
  fieldControl: fieldControlSlice.getInitialState(),
  gameField: gameFieldSlice.getInitialState(),
  figurePalette: figurePaletteSlice.getInitialState(),
};

export const initialStateAllForTests = {
  ...initialStateAll,
  fieldControl: {
    ...initialStateAll.fieldControl,
    cellSize: 40,
    speed: 2,
  },
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

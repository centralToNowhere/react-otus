import React, { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import your own reducer
import { authSaga, authSlice } from "@/auth/AuthRdx";
import {
  fieldControlSlice,
  fieldControlsSaga,
} from "@/components/Fields/FieldControlRdx";
import { gameFieldSlice } from "@/components/GameField/GameFieldRdx";
import { initialStateAll } from "@/store/redux/store";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";

function render(
  ui: ReactElement,
  {
    preloadedState = initialStateAll,
    ...renderOptions
  }: {
    preloadedState: Partial<typeof initialStateAll>;
  }
) {
  const sagaMiddleware = createSagaMiddleware();

  const rootSaga = function* () {
    yield fork(fieldControlsSaga);
    yield fork(authSaga);
  };

  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      gameField: gameFieldSlice.reducer,
      fieldControl: fieldControlSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(sagaMiddleware);
    },
    preloadedState: {
      ...initialStateAll,
      ...preloadedState,
    },
  });

  sagaMiddleware.run(rootSaga);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };

import React, { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { authSlice } from "@/auth";
import { fieldControlSlice } from "@/components/Fields";
import { initialStateAll, rootSaga } from "@/store/redux/store";
import createSagaMiddleware from "redux-saga";
import { gameFieldSlice } from "@/components/GameField";

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

  const SagaTask = sagaMiddleware.run(rootSaga);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
    SagaTask,
  };
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };

import React, { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import your own reducer
import { authSlice } from "@/auth/AuthRdx";
import { fieldControlSlice } from "@/components/Fields/FieldControlRdx";
import { gameFieldSlice } from "@/components/GameField/GameFieldRdx";
import { initialStateAll } from "@/store/redux/store";

function render(
  ui: ReactElement,
  {
    preloadedState = initialStateAll,
    ...renderOptions
  }: {
    preloadedState: Partial<typeof initialStateAll>;
  }
) {
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      gameField: gameFieldSlice.reducer,
      fieldControl: fieldControlSlice.reducer,
    },
    preloadedState: {
      ...initialStateAll,
      ...preloadedState,
    },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };

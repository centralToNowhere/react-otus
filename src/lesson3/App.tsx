import React from "react";
import Field from "./components/Field";
import ErrorBoundary from "./components/error/Error";
import store from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Field rowSize={10} backgroundColor={"white"} />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;

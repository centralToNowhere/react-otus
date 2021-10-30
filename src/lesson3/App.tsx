import React from "react";
import Field from "./components/Field";
import ErrorBoundary from "./components/error/Error";

const App = () => {
  return (
    <ErrorBoundary>
      <Field rowSize={10} backgroundColor={"white"} />
    </ErrorBoundary>
  );
};

export default App;

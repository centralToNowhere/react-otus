import React, { FC } from "react";
import ErrorBoundary from "./components/error/Error";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <h1>React typescript template</h1>
    </ErrorBoundary>
  );
};

export default App;

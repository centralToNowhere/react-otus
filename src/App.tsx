import React, { FC } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "modern-css-reset/dist/reset.min.css";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <h1>React typescript template</h1>
    </ErrorBoundary>
  );
};

export const testA = () => {
  return "A";
};

export const testB = () => {
  return testA();
};

export default App;

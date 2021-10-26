import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

enum En {
  TEST = 3,
}

const testFn = (a: number, b: number): number => {
  return a + b;
};

const a = 4;

console.log(En.TEST, testFn(a, 2));

ReactDOM.render(<App />, document.querySelector("#react-root"));

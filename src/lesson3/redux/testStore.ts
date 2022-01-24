import { createStore } from "redux";
import { reducer } from "./store";

const testInitialState = {
  cells: [],
};

const store = createStore(reducer, testInitialState);

export default store;

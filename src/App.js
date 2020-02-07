import React from "react";
import "./App.css";

import { Provider } from "react-redux";

import Routes from "./routes";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;

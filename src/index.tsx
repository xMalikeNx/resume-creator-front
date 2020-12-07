import React from "react";
import ReactDOM from "react-dom";

import { initAxios } from "./utils/initAxios";
import { createRootStore } from "./mst/createRootStore";
import { RootStoreProvider } from "./mst/rootStoreContext";
import { App } from "./components/App";
import "./index.scss";

initAxios();
const rootStore = createRootStore();

ReactDOM.render(
  <RootStoreProvider value={rootStore}>
    <App />
  </RootStoreProvider>,
  document.getElementById("root")
);

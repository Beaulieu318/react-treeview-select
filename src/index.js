import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
// import generateTree from './generateTree'
import { transformJSONToTree, dataJSON } from "./generateTree";
import Node from "./containers/Node";

// const tree = generateTree()
const tree = transformJSONToTree(dataJSON, ["year", "farm", "crop"]);
const store = createStore(
  reducer,
  tree,
  process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById("root")
);

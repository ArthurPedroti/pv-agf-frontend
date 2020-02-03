import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware = [thunk];

const dev = (
  (window || {}).__REDUX_DEVTOOLS_EXTENSION__ || (() => store => store)
)();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), dev)
);
export default store;

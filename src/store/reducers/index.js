import { combineReducers } from "redux";

import pedidoInfos from "./pedidoInfos";
import sellers from "./sellers";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  pedidoInfos,
  sellers,
  form: formReducer
});

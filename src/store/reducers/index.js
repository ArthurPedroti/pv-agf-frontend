import { combineReducers } from "redux";

import pedidoInfos from "./pedidoInfos";
import sellers from "./sellers";
import operation_natures from "./operation_natures";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  pedidoInfos,
  sellers,
  operation_natures,
  form: formReducer
});

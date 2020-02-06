import { combineReducers } from "redux";

import select_infos from "./select_infos";
import sellers from "./sellers";
import operation_natures from "./operation_natures";
import clients from "./clients";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  select_infos,
  sellers,
  operation_natures,
  clients,
  form: formReducer
});

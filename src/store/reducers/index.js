import { combineReducers } from "redux";

import select_infos from "./select_infos";
import bd_select from "./bd_select";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  select_infos,
  bd_select,
  form: formReducer
});

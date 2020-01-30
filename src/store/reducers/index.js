import { combineReducers } from "redux";

import pedidoInfos from "./pedidoInfos";
import sellers from "./sellers";

export default combineReducers({
  pedidoInfos,
  sellers
});

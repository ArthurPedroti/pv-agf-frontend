import api from "../../services/api";
import { FETCH_OPERATION_NATURES } from "./types";

export function loadOperatioNatures() {
  return dispatch => {
    return api.get("/opnatures").then(response => {
      dispatch(fetchOperatioNatures(response.data));
    });
  };
}

export function fetchOperatioNatures(operationNatures) {
  return {
    type: FETCH_OPERATION_NATURES,
    operationNatures: operationNatures
  };
}

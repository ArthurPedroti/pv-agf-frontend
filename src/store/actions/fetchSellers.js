import api from "../../services/api";
import { FETCH_SELLERS } from "./types";

export function loadSellers() {
  return dispatch => {
    return api.get("/sellers").then(response => {
      dispatch(fetchSellers(response.data));
    });
  };
}

export function fetchSellers(sellers) {
  return {
    type: FETCH_SELLERS,
    sellers: sellers
  };
}

import api from "../../services/api";
import { FETCH_SELLERS, FETCH_OPERATION_NATURES, FETCH_CLIENTS } from "./types";

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

export function loadOperation_natures() {
  return dispatch => {
    return api.get("/ons").then(response => {
      dispatch(fetchOperation_natures(response.data));
    });
  };
}

export function fetchOperation_natures(operation_natures) {
  return {
    type: FETCH_OPERATION_NATURES,
    operation_natures: operation_natures
  };
}

export function loadClients() {
  return dispatch => {
    return api.get("/clients").then(response => {
      dispatch(fetchClients(response.data));
    });
  };
}

export function fetchClients(clients) {
  return {
    type: FETCH_CLIENTS,
    clients: clients
  };
}

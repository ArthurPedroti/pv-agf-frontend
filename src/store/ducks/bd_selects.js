import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  fetchSellers: ["sellers"],
  fetchOperation_natures: ["operation_natures"],
  fetchClients: ["clients"]
});

const INITIAL_STATE = {};

const sellers = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    sellers: action.sellers
  };
};

const operation_natures = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    operation_natures: action.operation_natures
  };
};

const clients = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    clients: action.clients
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_SELLERS]: sellers,
  [Types.FETCH_OPERATION_NATURES]: operation_natures,
  [Types.FETCH_CLIENTS]: clients
});

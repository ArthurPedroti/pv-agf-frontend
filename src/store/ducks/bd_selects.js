import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  fetchSellers: ["sellers"],
  fetchOperation_natures: ["operation_natures"],
  fetchClients: ["clients"],
  fetchProducts: ["products"]
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

const products = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    products: action.products
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_SELLERS]: sellers,
  [Types.FETCH_OPERATION_NATURES]: operation_natures,
  [Types.FETCH_CLIENTS]: clients,
  [Types.FETCH_PRODUCTS]: products
});

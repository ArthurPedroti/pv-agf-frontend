import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  fetchSellers: ["sellers"],
  fetchOperation_natures: ["operation_natures"],
  fetchSystem_clients: ["system_clients"],
  fetchSeller_clients: ["seller_clients"],
  fetchProducts: ["products"],
  fetchKits: ["kits"],
  fetchMachines: ["machines"],
  fetchImportant_infos: ["important_infos"],
  fetchConditions: ["conditions"],
  fetchTool_types: ["tool_types"],
  fetchPayment_methods: ["payment_methods"],
  fetchFreights: ["freights"]
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

const system_clients = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    system_clients: action.system_clients
  };
};

const seller_clients = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    seller_clients: action.seller_clients
  };
};

const products = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    products: action.products
  };
};

const kits = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    kits: action.kits
  };
};

const machines = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    machines: action.machines
  };
};

const important_infos = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    important_infos: action.important_infos
  };
};

const conditions = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    conditions: action.conditions
  };
};

const tool_types = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    tool_types: action.tool_types
  };
};

const payment_methods = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    payment_methods: action.payment_methods
  };
};

const freights = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    freights: action.freights
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_SELLERS]: sellers,
  [Types.FETCH_OPERATION_NATURES]: operation_natures,
  [Types.FETCH_SYSTEM_CLIENTS]: system_clients,
  [Types.FETCH_SELLER_CLIENTS]: seller_clients,
  [Types.FETCH_PRODUCTS]: products,
  [Types.FETCH_KITS]: kits,
  [Types.FETCH_MACHINES]: machines,
  [Types.FETCH_IMPORTANT_INFOS]: important_infos,
  [Types.FETCH_CONDITIONS]: conditions,
  [Types.FETCH_TOOL_TYPES]: tool_types,
  [Types.FETCH_PAYMENT_METHODS]: payment_methods,
  [Types.FETCH_FREIGHTS]: freights
});

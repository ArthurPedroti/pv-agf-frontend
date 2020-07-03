import api from "../../services/api";

// FETCH_SELLERS
export function loadSellers() {
  return dispatch => {
    return api.get("/sellers").then(response => {
      dispatch(fetchSellers(response.data));
    });
  };
}

export function fetchSellers(sellers) {
  return {
    type: "FETCH_SELLERS",
    sellers: sellers
  };
}

// FETCH_OPERATION_NATURES
export function loadOperation_natures() {
  return dispatch => {
    return api.get("/ons").then(response => {
      dispatch(fetchOperation_natures(response.data));
    });
  };
}

export function fetchOperation_natures(operation_natures) {
  return {
    type: "FETCH_OPERATION_NATURES",
    operation_natures: operation_natures
  };
}

// FETCH_SYSTEM_CLIENTS
export function loadSystem_clients() {
  return dispatch => {
    return api.get("/systemclients").then(response => {
      dispatch(fetchSystem_clients(response.data));
    });
  };
}

export function fetchSystem_clients(system_clients) {
  return {
    type: "FETCH_SYSTEM_CLIENTS",
    system_clients: system_clients
  };
}

// FETCH_SELLER_CLIENTS
export function loadSeller_clients() {
  return dispatch => {
    return api.get("/sellerclients").then(response => {
      dispatch(fetchSeller_clients(response.data));
    });
  };
}

export function fetchSeller_clients(seller_clients) {
  return {
    type: "FETCH_SELLER_CLIENTS",
    seller_clients: seller_clients
  };
}

// FETCH_PRODUCTS
export function loadProducts() {
  return dispatch => {
    return api.get("/products").then(response => {
      dispatch(fetchProducts(response.data));
    });
  };
}

export function fetchProducts(products) {
  return {
    type: "FETCH_PRODUCTS",
    products: products
  };
}

// FETCH_KITS
export function loadKits() {
  return dispatch => {
    return api.get("/kits").then(response => {
      dispatch(fetchKits(response.data));
    });
  };
}

export function fetchKits(kits) {
  return {
    type: "FETCH_KITS",
    kits: kits
  };
}

// FETCH_MACHINES
export function loadMachines() {
  return dispatch => {
    return api.get("/machines").then(response => {
      dispatch(fetchMachines(response.data));
    });
  };
}

export function fetchMachines(machines) {
  return {
    type: "FETCH_MACHINES",
    machines: machines
  };
}

// FETCH_IMPORTANT_INFOS
export function loadImportant_infos() {
  return dispatch => {
    return api.get("/importantinfos").then(response => {
      dispatch(fetchImportant_infos(response.data));
    });
  };
}

export function fetchImportant_infos(important_infos) {
  return {
    type: "FETCH_IMPORTANT_INFOS",
    important_infos: important_infos
  };
}

// FETCH_CONDITIONS
export function loadConditions() {
  return dispatch => {
    return api.get("/conditions").then(response => {
      dispatch(fetchConditions(response.data));
    });
  };
}

export function fetchConditions(conditions) {
  return {
    type: "FETCH_CONDITIONS",
    conditions: conditions
  };
}

// FETCH_TOOL_TYPES
export function loadTool_types() {
  return dispatch => {
    return api.get("/tooltypes").then(response => {
      dispatch(fetchTool_types(response.data));
    });
  };
}

export function fetchTool_types(tool_types) {
  return {
    type: "FETCH_TOOL_TYPES",
    tool_types: tool_types
  };
}

// FETCH_PAYMENT_METHODS
export function loadPayment_methods() {
  return dispatch => {
    return api.get("/paymentmethods").then(response => {
      dispatch(fetchPayment_methods(response.data));
    });
  };
}

export function fetchPayment_methods(payment_methods) {
  return {
    type: "FETCH_PAYMENT_METHODS",
    payment_methods: payment_methods
  };
}

// FETCH_FREIGHTS
export function loadFreights() {
  return dispatch => {
    return api.get("/freights").then(response => {
      dispatch(fetchFreights(response.data));
    });
  };
}

export function fetchFreights(freights) {
  return {
    type: "FETCH_FREIGHTS",
    freights: freights
  };
}

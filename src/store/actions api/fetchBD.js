import api from "../../services/api";

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

export function loadClients() {
  return dispatch => {
    return api.get("/clients").then(response => {
      dispatch(fetchClients(response.data));
    });
  };
}

export function fetchClients(clients) {
  return {
    type: "FETCH_CLIENTS",
    clients: clients
  };
}

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

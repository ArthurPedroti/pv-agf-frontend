import api from '../../services/api';

// FETCH_SELLERS
export function fetchSellers(sellers) {
  return {
    type: 'FETCH_SELLERS',
    sellers,
  };
}

export function loadSellers() {
  return dispatch =>
    api.get('/sellers').then(response => {
      dispatch(fetchSellers(response.data));
    });
}

// FETCH_OPERATION_NATURES
export function fetchOperation_natures(operation_natures) {
  return {
    type: 'FETCH_OPERATION_NATURES',
    operation_natures,
  };
}

export function loadOperation_natures() {
  return dispatch =>
    api.get('/ons').then(response => {
      dispatch(fetchOperation_natures(response.data));
    });
}

// FETCH_SYSTEM_CLIENTS
export function fetchSystem_clients(system_clients) {
  return {
    type: 'FETCH_SYSTEM_CLIENTS',
    system_clients,
  };
}

export function loadSystem_clients() {
  return async dispatch => {
    try {
      await api.get('/clients').then(response => {
        dispatch(fetchSystem_clients(response.data));
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

// FETCH_SELLER_CLIENTS
export function fetchSeller_clients(seller_clients) {
  return {
    type: 'FETCH_SELLER_CLIENTS',
    seller_clients,
  };
}

export function loadSeller_clients() {
  return dispatch =>
    api.get('/sellerclients').then(response => {
      dispatch(fetchSeller_clients(response.data));
    });
}

// FETCH_PRODUCTS
export function fetchProducts(products) {
  return {
    type: 'FETCH_PRODUCTS',
    products,
  };
}

export function loadProducts() {
  return async dispatch => {
    try {
      await api
        .get('/products', {
          headers: {
            filial: '01',
            grupo:
              "0010','0020','0030','0040','0050','0060','0070','0080','0090','0091','0092','0093','0094','0095','0097','0110','0120','0130','0200','0201','0202','0203','0204','0300','0301','0350','0360','0370','0375','0380','0390','0400','0401','0490','0500','0501','0502','0503','0510','0520','0530','0540','0550','0560','0570', '9999",
          },
        })
        .then(response => {
          dispatch(fetchProducts(response.data));
        });
    } catch (err) {
      throw new Error(err);
    }
  };
}

// FETCH_KITS
export function fetchKits(kits) {
  return {
    type: 'FETCH_KITS',
    kits,
  };
}

export function loadKits() {
  return dispatch =>
    api.get('/kits').then(response => {
      dispatch(fetchKits(response.data));
    });
}

// FETCH_MACHINES
export function fetchMachines(machines) {
  return {
    type: 'FETCH_MACHINES',
    machines,
  };
}

export function loadMachines() {
  return dispatch =>
    api.get('/machines').then(response => {
      dispatch(fetchMachines(response.data));
    });
}

// FETCH_IMPORTANT_INFOS
export function fetchImportant_infos(important_infos) {
  return {
    type: 'FETCH_IMPORTANT_INFOS',
    important_infos,
  };
}

export function loadImportant_infos() {
  return dispatch =>
    api.get('/importantinfos').then(response => {
      dispatch(fetchImportant_infos(response.data));
    });
}

// FETCH_CONDITIONS
export function fetchConditions(conditions) {
  return {
    type: 'FETCH_CONDITIONS',
    conditions,
  };
}

export function loadConditions() {
  return dispatch =>
    api.get('/conditions').then(response => {
      dispatch(fetchConditions(response.data));
    });
}

// FETCH_TOOL_TYPES
export function fetchTool_types(tool_types) {
  return {
    type: 'FETCH_TOOL_TYPES',
    tool_types,
  };
}

export function loadTool_types() {
  return dispatch =>
    api.get('/tooltypes').then(response => {
      dispatch(fetchTool_types(response.data));
    });
}

// FETCH_PAYMENT_METHODS
export function fetchPayment_methods(payment_methods) {
  return {
    type: 'FETCH_PAYMENT_METHODS',
    payment_methods,
  };
}

export function loadPayment_methods() {
  return dispatch =>
    api.get('/paymentmethods').then(response => {
      dispatch(fetchPayment_methods(response.data));
    });
}

// FETCH_FREIGHTS
export function fetchFreights(freights) {
  return {
    type: 'FETCH_FREIGHTS',
    freights,
  };
}

export function loadFreights() {
  return dispatch =>
    api.get('/freights').then(response => {
      dispatch(fetchFreights(response.data));
    });
}

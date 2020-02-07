import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  toggleSeller: ["seller"],
  toggleON: ["on"],
  toggleClient: ["client"]
});

const INITIAL_STATE = {
  vendedor: "",
  naturezaOperacao: "",
  cliente: ""
};

const seller = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    vendedor: action.seller
  };
};

const on = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    naturezaOperacao: action.on
  };
};

const client = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    cliente: action.client
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.TOGGLE_SELLER]: seller,
  [Types.TOGGLE_ON]: on,
  [Types.TOGGLE_CLIENT]: client
});

import {
  FETCH_SELLERS,
  FETCH_OPERATION_NATURES,
  FETCH_CLIENTS
} from "../actions/types";

const initialState = {};

export default function bd_select(state = initialState, action) {
  switch (action.type) {
    case FETCH_SELLERS:
      return {
        ...state,
        sellers: action.sellers
      };
    case FETCH_OPERATION_NATURES:
      return {
        ...state,
        operation_natures: action.operation_natures
      };
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: action.clients
      };
    default:
      return state;
  }
}

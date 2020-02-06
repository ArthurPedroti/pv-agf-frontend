import { FETCH_SELLERS } from "../actions/types";

const initialState = {};

export default function sellers(state = initialState, action) {
  switch (action.type) {
    case FETCH_SELLERS:
      return {
        ...state,
        sellers: action.sellers
      };
    default:
      return state;
  }
}

import { FETCH_CLIENTS } from "../actions/types";

const initialState = {
  clients: []
};

export default function clients(state = initialState, action) {
  console.log(action.clients);
  switch (action.type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: action.clients
      };
    default:
      return state;
  }
}

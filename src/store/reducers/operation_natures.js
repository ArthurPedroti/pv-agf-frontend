import { FETCH_OPERATION_NATURES } from "../actions/types";

const initialState = {
  operation_natures: []
};

export default function operation_natures(state = initialState, action) {
  switch (action.type) {
    case FETCH_OPERATION_NATURES:
      return {
        ...state,
        operation_natures: action.operation_natures
      };
    default:
      return state;
  }
}

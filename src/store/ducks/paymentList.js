import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  addPayment: ["date", "value", "condition"],
  removePayment: ["id"],
  resetPayment: []
});

/**
 * Handlers
 */
const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  {
    id: Math.random(),
    date: action.date,
    value: action.value,
    condition: action.condition
  }
];

const remove = (state = INITIAL_STATE, action) =>
  state.filter(product => product.id !== action.id);

const reset = (state = INITIAL_STATE, action) => (state = INITIAL_STATE);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.ADD_PAYMENT]: add,
  [Types.REMOVE_PAYMENT]: remove,
  [Types.RESET_PAYMENT]: reset
});

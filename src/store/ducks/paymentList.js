import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  addPayment: ["num", "date", "value", "condition"],
  removePayment: ["id"]
});

/**
 * Handlers
 */
const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  {
    id: Math.random(),
    num: action.num,
    date: action.date,
    value: action.value,
    condition: action.condition
  }
];

const remove = (state = INITIAL_STATE, action) =>
  state.filter(product => product.id !== action.id);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.ADD_PAYMENT]: add,
  [Types.REMOVE_PAYMENT]: remove
});

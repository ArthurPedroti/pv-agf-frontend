import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  addProduct: ["text", "value", "qtd"],
  removeProduct: ["id"]
});

/**
 * Handlers
 */
const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  {
    id: Math.random(),
    product: action.text,
    value: action.value,
    qtd: action.qtd,
    complete: false
  }
];

const remove = (state = INITIAL_STATE, action) =>
  state.filter(product => product.id !== action.id);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT]: add,
  [Types.REMOVE_PRODUCT]: remove
});

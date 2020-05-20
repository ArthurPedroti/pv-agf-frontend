import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  addOrder: ["name", "cliente", "values", "produtos", "parcelas"],
  removeOrder: ["id"],
  resetOrder: [],
});

/**
 * Handlers
 */
const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  {
    id: Math.random(),
    name: action.name,
    cliente: action.cliente,
    values: action.values,
    produtos: action.produtos,
    parcelas: action.parcelas,
  },
];

const remove = (state = INITIAL_STATE, action) =>
  state.filter((product) => product.id !== action.id);

const reset = (state = INITIAL_STATE, action) => (state = INITIAL_STATE);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.ADD_ORDER]: add,
  [Types.REMOVE_ORDER]: remove,
  [Types.RESET_ORDER]: reset,
});

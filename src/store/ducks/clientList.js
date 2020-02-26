import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  addClient: [
    "razaoSocial",
    "cnpj",
    "inscricaoEstadual",
    "endereco",
    "bairro",
    "municipio",
    "uf",
    "cep",
    "telefone",
    "celular"
  ],
  removeClient: ["id"]
});

/**
 * Handlers
 */
const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  {
    id: Math.random(),
    razaoSocial: action.razaoSocial,
    cnpj: action.cnpj,
    inscricaoEstadual: action.inscricaoEstadual,
    endereco: action.endereco,
    bairro: action.bairro,
    municipio: action.municipio,
    uf: action.uf,
    cep: action.cep,
    telefone: action.telefone,
    celular: action.celular
  }
];

const remove = (state = INITIAL_STATE, action) =>
  state.filter(product => product.id !== action.id);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.ADD_CLIENT]: add,
  [Types.REMOVE_CLIENT]: remove
});

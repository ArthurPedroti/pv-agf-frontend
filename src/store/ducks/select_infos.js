import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  toggleSeller: ["seller"],
  toggleON: ["on"],
  toggleClient: ["client"],
  toggleKit: ["kit"],
  toggleMachine: ["machine"],
  toggleImportant_info: ["important_info"],
  toggleCondition: ["condition"],
  toggleTool_type: ["tool_type"],
  togglePayment_method: ["payment_method"],
  toggleFreight: ["freight"],
  resetSelect: [],
});

const INITIAL_STATE = {
  vendedor: "",
  naturezaOperacao: "",
  cliente: "",
  kit: "",
  maquina: "",
  informacaoImportante: "",
  condicao: "",
  tipoPonteira: "",
  metodoPagamento: "",
  frete: "",
};

const seller = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    vendedor: action.seller,
  };
};

const on = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    naturezaOperacao: action.on,
  };
};

const client = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    cliente: action.client,
  };
};

const kit = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    kit: action.kit,
  };
};

const machine = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    maquina: action.machine,
  };
};

const important_info = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    informacaoImportante: action.important_info,
  };
};

const condition = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    condicao: action.condition,
  };
};

const tool_type = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    tipoPonteira: action.tool_type,
  };
};

const payment_method = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    metodoPagamento: action.payment_method,
  };
};

const freight = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    frete: action.freight,
  };
};

const reset = (state = INITIAL_STATE) => (state = INITIAL_STATE);

export default createReducer(INITIAL_STATE, {
  [Types.TOGGLE_SELLER]: seller,
  [Types.TOGGLE_ON]: on,
  [Types.TOGGLE_CLIENT]: client,
  [Types.TOGGLE_KIT]: kit,
  [Types.TOGGLE_MACHINE]: machine,
  [Types.TOGGLE_IMPORTANT_INFO]: important_info,
  [Types.TOGGLE_CONDITION]: condition,
  [Types.TOGGLE_TOOL_TYPE]: tool_type,
  [Types.TOGGLE_PAYMENT_METHOD]: payment_method,
  [Types.TOGGLE_FREIGHT]: freight,
  [Types.RESET_SELECT]: reset,
});

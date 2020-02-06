const INITIAL_STATE = {
  vendedor: "",
  naturezaOperacao: ""
};

export default function select_infos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_SELLER":
      return {
        ...state,
        vendedor: action.seller
      };
    case "TOGGLE_ON":
      return {
        ...state,
        naturezaOperacao: action.on
      };
    default:
      return state;
  }
}

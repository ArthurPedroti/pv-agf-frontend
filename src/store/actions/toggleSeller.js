export function toggleSeller(vendedor, naturezaOperacao) {
  return {
    type: "TOGGLE_SELLER",
    vendedor,
    naturezaOperacao
  };
}

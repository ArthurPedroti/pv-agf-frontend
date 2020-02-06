import { TOGGLE_SELLER, TOGGLE_ON } from "./types";

export function toggleSeller(seller) {
  return {
    type: TOGGLE_SELLER,
    seller: seller
  };
}

export function toggleON(on) {
  return {
    type: TOGGLE_ON,
    on: on
  };
}

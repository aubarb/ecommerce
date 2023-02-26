import { atom } from "recoil";

export const cartItemsAtom = atom({
  key: 'cartItems',
  default: [],
});
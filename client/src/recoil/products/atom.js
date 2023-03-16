import { atom } from "recoil";

export const productsAtom = atom({
  key: 'Products',
  default: [],
});

export const searchAtom = atom({
  key: 'Search',
  default: "",
})
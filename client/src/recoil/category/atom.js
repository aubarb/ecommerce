import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const categoryAtom = atom({
  key: 'Category',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
import { atom } from "recoil";

export const activeElementPropertyState = atom<{
  height?: number;
  width?: number;
}>({
  key: "active",
  default: {},
});

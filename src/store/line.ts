import { atomFamily } from "recoil";

export const lineIdsState = atomFamily<string[], string>({
  key: "lineIds",
  default: [],
});

import { atomFamily } from "recoil";

export type LineType = "normal" | "placeholder";

export type LineContent = {
  lineId: string;
  lineType: LineType;
};

export const lineContentState = atomFamily<LineContent[], string>({
  key: "lineIds",
  default: [],
});

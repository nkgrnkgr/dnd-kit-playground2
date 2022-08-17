import { atomFamily } from "recoil";

export type LineType = "normal" | "placeholder";

export type LineContent = {
  contentId: string;
  lineType: LineType;
  from: string;
};

export const lineContentState = atomFamily<LineContent[], string>({
  key: "lineIds",
  default: [],
});

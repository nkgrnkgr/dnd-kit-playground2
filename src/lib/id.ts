import { v4 as uuid } from "uuid";

const LINE_ID_POST_FIX = "#";

export const EMPTY_LINE_ID = "EMPTY";
export const createEmptyLineId = (lineId: string) =>
  `${lineId}${LINE_ID_POST_FIX}${EMPTY_LINE_ID}`;

export const createContentId = (lineId: string) =>
  `${lineId}${LINE_ID_POST_FIX}${uuid()}`;

export const extractIds = (id: string) => {
  const lineId = id.split(LINE_ID_POST_FIX)[0];
  const uniqueId = id.split(LINE_ID_POST_FIX)[1];
  return [lineId, uniqueId];
};

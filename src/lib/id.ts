const DRAGGABLE_PREFIX = "draggable-";
const SORTABLE_PREFIX = "sortable-";

export const createDraggableItemId = (item: string) =>
  `${DRAGGABLE_PREFIX}${item}`;
export const createSortableItemId = (lineId: string, item: string) =>
  `sortable-${lineId}${item}`;
export const getIdFromDraggable = (str: string) =>
  str.split(DRAGGABLE_PREFIX)[1];
export const getIdFromSortable = (str: string) => str.split(SORTABLE_PREFIX)[1];

export const getIdType = (str: string) => {
  if (str.startsWith(DRAGGABLE_PREFIX)) {
    return "draggable";
  }

  if (str.startsWith(SORTABLE_PREFIX)) {
    return "sortable";
  }

  return "";
};

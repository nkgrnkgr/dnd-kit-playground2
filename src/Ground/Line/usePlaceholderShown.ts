import { useSortable } from "@dnd-kit/sortable";
import { extractIds } from "../../lib/id";

export const usePlaceHolder = (itemId: string) => {
  const { isOver, active, over } = useSortable({
    id: itemId,
  });

  if (isOver) {
    // ソート中
    if (active && over) {
      const [activeLineId] = extractIds(active.id.toString());
      const [overLineId] = extractIds(over.id.toString());
      return activeLineId !== overLineId;
    }

    return true;
  }
  return false;
};

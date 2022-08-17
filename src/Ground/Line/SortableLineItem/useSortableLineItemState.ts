import { useSortable } from "@dnd-kit/sortable";
import { useRecoilValue } from "recoil";
import { extractIds } from "../../../lib/id";
import { lineContentState } from "../../../store/line";

export const useSortableLineItemState = (itemId: string) => {
  const { isOver, active, over } = useSortable({
    id: itemId,
  });
  const [lineId] = extractIds(itemId);
  const lineContents = useRecoilValue(lineContentState(lineId));
  const found = lineContents.find((c) => c.contentId === itemId);

  return {
    placeholderShown: getPlaceholderShown(
      isOver,
      active?.id.toString(),
      over?.id.toString()
    ),
    lineContent: found,
    lineId,
  };
};

const getPlaceholderShown = (
  isOver: boolean,
  activeId: string | undefined,
  overId: string | undefined
) => {
  if (activeId && overId) {
    const [activeLineId] = extractIds(activeId);
    const [overLineId] = extractIds(overId);

    // ソート中はplaceholderを出さない
    return activeLineId === overLineId ? false : isOver;
  }
  return isOver;
};

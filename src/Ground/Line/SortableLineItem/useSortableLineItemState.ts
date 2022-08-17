import { useSortable } from "@dnd-kit/sortable";
import { LayoutGroupContext } from "framer-motion";
import { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { extractIds } from "../../../lib/id";
import { activeElementPropertyState } from "../../../store/activeElementProperty";
import { lineContentState } from "../../../store/line";

export const useSortableLineItemState = (itemId: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOver, active, over, isDragging } = useSortable({
    id: itemId,
  });
  const [lineId] = extractIds(itemId);
  const lineContents = useRecoilValue(lineContentState(lineId));
  const found = lineContents.find((c) => c.contentId === itemId);

  const setActiveElementProperty = useSetRecoilState(
    activeElementPropertyState
  );
  if (ref.current && isDragging) {
    setActiveElementProperty({
      height: ref.current.clientHeight,
      width: ref.current.clientWidth,
    });
  }

  return {
    ref,
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

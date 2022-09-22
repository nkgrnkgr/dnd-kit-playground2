import { Flex } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import { Form } from "./components/Form";
import { OverLayItem } from "./components/OverlayItem";
import { ITEM_HIGHT } from "./components/ui/Item";
import { createContentId, extractIds } from "./lib/id";
import { insertToArray } from "./lib/insertToArray";
import { ItemType } from "./modules/itemsSlice";
import { actions } from "./modules/pageSlice";
import { RootState, useRootDispatch } from "./modules/store";
import { Result } from "./Result";
import { SideBar } from "./Sidebar";
import { LineContent } from "./store/line";

export const App: React.FC = () => {
  const handleDragEnd = (event: DragEndEvent) => {};
  const dispatch = useRootDispatch();

  const handleDragStart = (event: DragStartEvent) => {
    // @ts-ignore-next-line
    const type = event.active.data.current.type as ItemType;
    dispatch(
      actions.setActiveElementProperty({
        id: event.active.id.toString(),
        width: "200px",
        height: ITEM_HIGHT[type],
      })
    );
  };
  const activeId = useSelector(
    (state: RootState) => state.page.activeElementProperty.id
  );

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Flex gap="12">
        <SideBar />
        <Form />
        <Result />
      </Flex>
      <DragOverlay>
        {/* 追加 or ソート？ */}
        {activeId ? <OverLayItem itemId={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

const insertOrUpdate = (
  lineContentsOriginal: LineContent[],
  setLineContentsOriginal: (lineContents: LineContent[]) => void,
  lineContentsAnother: LineContent[],
  setLineContentsAnother: (lineContents: LineContent[]) => void,
  activeId: string,
  overId: string
) => {
  const found = lineContentsOriginal.find((c) => c.contentId === activeId);
  const overIdIndex = lineContentsOriginal.findIndex(
    (c) => c.contentId === overId
  );
  const [overLineId] = extractIds(overId);
  // 追加 & 削除
  if (!found) {
    const inserted = insertToArray<LineContent>(
      lineContentsOriginal,
      {
        contentId: createContentId(overLineId),
        lineType: "normal",
        from: activeId,
      },
      overIdIndex >= 0 ? overIdIndex : lineContentsOriginal.length
    );
    setLineContentsOriginal([...inserted]);

    // 削除
    const filtered = lineContentsAnother.filter(
      (c) => c.contentId !== activeId
    );
    setLineContentsAnother([...filtered]);
    return;
  }
  // ソート
  const activeIndex = lineContentsOriginal.findIndex(
    (c) => c.contentId === activeId
  );
  const moved = arrayMove(lineContentsOriginal, activeIndex, overIdIndex);
  setLineContentsOriginal([...moved]);
  return;
};

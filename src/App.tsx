import { Flex } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
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
import {
  actions as itemsActions,
  itemsSelector,
  ItemType,
} from "./modules/itemsSlice";
import { actions as rowsActions } from "./modules/rowsSlice";
import { actions } from "./modules/pageSlice";
import { useRootDispatch } from "./modules/store";
import { Result } from "./Result";
import { SideBar } from "./Sidebar";
import { LineContent } from "./store/line";
import { v4 as uuid } from "uuid";

export const App: React.FC = () => {
  const dispatch = useRootDispatch();
  const itemIds = useSelector(itemsSelector.selectIds);

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

  const handleDragEnd = (event: DragEndEvent) => {
    // @ts-ignore
    if (event.active && event.over && event.over.data.current.rowId) {
      const activeId = event.active.id;
      // @ts-ignore
      const targetRowId = event.over.data.current.rowId as string;

      // insert
      if (
        itemIds.find((itemId) => itemId === activeId.toString()) === undefined
      ) {
        // @ts-ignore
        const type = event.active.data.current.type as ItemType;
        const newId = uuid();
        dispatch(
          itemsActions.addItem({
            itemId: newId,
            isPlaceHolder: false,
            type,
          })
        );
        dispatch(
          rowsActions.addItemId({
            rowId: targetRowId,
            itemId: newId,
          })
        );
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Flex gap="12">
        <SideBar />
        <Form />
        <Result />
      </Flex>
      <DragOverlay>
        <OverLayItem />
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

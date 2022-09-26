import { Flex } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Form } from "./Form";
import { OverLayItem } from "./OverlayItem";
import { SideBar } from "./Sidebar";
import { DEFAULT_WIDTH, ITEM_HIGHT } from "./helper/Item";
import {
  actions as itemsActions,
  itemsSelector,
  ItemType,
} from "../modules/itemsSlice";
import { actions } from "../modules/pageSlice";
import { actions as rowsActions, rowsSelector } from "../modules/rowsSlice";
import { useRootDispatch } from "../modules/store";
import { Result } from "./Result";

export const Page: React.FC = () => {
  const dispatch = useRootDispatch();
  const itemIds = useSelector(itemsSelector.selectIds);
  const rowIds = useSelector(rowsSelector.selectIds);

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
    if (event.active && event.over) {
      // 行の移動
      if (rowIds.includes(event.active.id.toString())) {
        dispatch(
          rowsActions.sortRow({
            activeRowId: event.active.id.toString(),
            overRowId: event.over.id.toString(),
          })
        );

        return;
      }

      const activeId = event.active.id;
      // @ts-ignore
      const activeItemType = event.active.data.current.type as ItemType;
      // @ts-ignore
      const overRowId = event.over.data.current.rowId as string;

      // @ts-ignore
      const activeRowId = event.active.data.current.rowId as string;

      /**
       * アイテムの移動
       */
      if (itemIds.includes(event.active.id.toString())) {
        // アイテムのソート
        if (activeRowId === overRowId) {
          dispatch(
            rowsActions.sortItem({
              rowId: activeRowId,
              activeItemId: activeId.toString(),
              overItemId: event.over.id.toString(),
            })
          );
        }

        // move to other Row
        if (activeRowId !== overRowId) {
          dispatch(
            rowsActions.moveItemId({
              activeItemId: activeId.toString(),
              activeRowId: activeRowId,
              overItemId: event.over.id.toString(),
              overRowId: overRowId,
            })
          );
        }
        return;
      }
      /**
       * サイドバーからのインサート
       */
      if (!overRowId) {
        return null;
      }

      const newId = uuid();
      dispatch(
        itemsActions.addItem({
          itemId: newId,
          type: activeItemType,
          width: DEFAULT_WIDTH,
        })
      );
      dispatch(
        rowsActions.addItemId({
          rowId: overRowId,
          itemId: newId,
        })
      );
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

import { Flex } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Form } from "./components/Form";
import { OverLayItem } from "./components/OverlayItem";
import { SideBar } from "./components/Sidebar";
import { ITEM_HIGHT } from "./components/helper/Item";
import {
  actions as itemsActions,
  itemsSelector,
  ItemType,
} from "./modules/itemsSlice";
import { actions } from "./modules/pageSlice";
import { actions as rowsActions } from "./modules/rowsSlice";
import { useRootDispatch } from "./modules/store";
import { Result } from "./components/Result";

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
      const activeItemType = event.active.data.current.type as ItemType;
      // @ts-ignore
      const overRowId = event.over.data.current.rowId as string;

      // insert
      if (itemIds.find((itemId) => itemId === activeId) === undefined) {
        // @ts-ignore
        const newId = uuid();
        dispatch(
          itemsActions.addItem({
            itemId: newId,
            type: activeItemType,
          })
        );
        dispatch(
          rowsActions.addItemId({
            rowId: overRowId,
            itemId: newId,
          })
        );
        return;
      }

      // @ts-ignore
      const activeRowId = event.active.data.current.rowId as string;
      // sort
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
        // dispatch(
        //   rowsActions.removeItemId({
        //     rowId: activeRowId,
        //     itemId: activeId.toString(),
        //   })
        // );
        // dispatch(
        //   rowsActions.addItemId({
        //     rowId: overRowId,
        //     itemId: activeId.toString(),
        //   })
        // );
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

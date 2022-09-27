import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  actions,
  Item,
  itemsSelector,
  ITEM_HIGHT,
} from "../../../../modules/itemsSlice";
import { RootState, useRootDispatch } from "../../../../modules/store";
import { CenterComponent } from "../../../helper/Center";
import { Sortable } from "../../../helper/dnd/Sortable";
import { PlaceHolder } from "../PlaceHolder";
import { WidthExtender } from "./WidthExtender";

type ComponentProps = {
  item: Item;
};

const usePlaceholderShown = (itemId: string) => {
  const { isOver, over, active } = useSortable({
    id: itemId,
  });

  // 同じ行でソート中はPlaceholderを出さない
  // @ts-ignore
  return isOver && over?.data.current.rowId !== active?.data.current.rowId;
};

const Component: React.FC<ComponentProps> = ({ item }) => {
  // overのIdと一致したとき
  const placeholderShown = usePlaceholderShown(item.itemId);
  const dispatch = useRootDispatch();

  const handleDragEnd = (e: DragEndEvent) => {
    // dispatch(
    //   actions.changeWidth({
    //     itemId: item.itemId,
    //     width: (item + e.delta.x).toString(),
    //   })
    // );
  };
  const handleDragMove = (e: DragMoveEvent) => {};

  return (
    <Flex
      sx={{
        position: "relative",
      }}
      alignItems="center"
    >
      {placeholderShown && <PlaceHolder />}
      <Center
        backgroundColor="blue.400"
        width={`${item.width}px`}
        height={`${ITEM_HIGHT[item.type]}px`}
      >
        <Text
          sx={{
            textAlign: "center",
          }}
          color="white"
        >
          {item.type}
        </Text>
      </Center>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "160px",
        }}
      >
        <WidthExtender
          id={item.itemId}
          height={`${ITEM_HIGHT[item.type]}px`}
          handleDragEnd={handleDragEnd}
          handleDragMove={handleDragMove}
        />
      </Box>
    </Flex>
  );
};

type Props = {
  itemId: string;
  rowId: string;
};

export const SortableRowItem: React.FC<Props> = ({ itemId, rowId }) => {
  const item = useSelector((state: RootState) =>
    itemsSelector.selectById(state, itemId)
  );

  if (!item) {
    return null;
  }

  return (
    <Sortable
      id={itemId}
      data={{
        itemType: item.type,
        rowId,
      }}
    >
      <Component item={item} />
    </Sortable>
  );
};

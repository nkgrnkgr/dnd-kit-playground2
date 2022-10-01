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
  const [width, setWidth] = useState(Number(item.width));
  const dispatch = useRootDispatch();

  const handleDragMove = (e: DragMoveEvent) => {
    const newWidth = Number(item.width) + e.delta.x;
    setWidth(newWidth);
  };
  const handleDragEnd = (e: DragEndEvent) => {
    const newWidth = Number(item.width) + e.delta.x;
    setWidth(newWidth);
    dispatch(
      actions.changeWidth({
        itemId: item.itemId,
        width: `${newWidth}`,
      })
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Flex alignItems="center">
        {placeholderShown && <PlaceHolder />}
        <Center
          backgroundColor="blue.400"
          width={`${width}px`}
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
      </Flex>
      <Flex alignItems="center">
        <WidthExtender
          id={item.itemId}
          left={item.width}
          height={`${ITEM_HIGHT[item.type]}px`}
          handleDragMove={handleDragMove}
          handleDragEnd={handleDragEnd}
        />
      </Flex>
    </Box>
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

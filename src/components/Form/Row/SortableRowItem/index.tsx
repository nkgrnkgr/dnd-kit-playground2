import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import {
  Item,
  itemsSelector,
  ITEM_HIGHT,
} from "../../../../modules/itemsSlice";
import { RootState } from "../../../../modules/store";
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

  return (
    <Flex alignItems="center">
      {placeholderShown && <PlaceHolder />}
      <CenterComponent
        backgroundColor="blue.400"
        width={`${item.width}px`}
        height={ITEM_HIGHT[item.type]}
      >
        <Text
          sx={{
            textAlign: "center",
          }}
          color="white"
        >
          {item.type}
        </Text>
      </CenterComponent>
      <WidthExtender
        itemWidth={item.width}
        id={item.itemId}
        height={ITEM_HIGHT[item.type]}
      />
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

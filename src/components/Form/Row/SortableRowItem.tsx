import { Flex, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import { Item, itemsSelector } from "../../../modules/itemsSlice";
import { RootState } from "../../../modules/store";
import { SortableItem } from "../../helper/dnd/SortableItem";
import { ItemComponent } from "../../helper/Item";
import { PlaceHolder } from "./PlaceHolder";

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
    <Flex gap={2}>
      {placeholderShown && <PlaceHolder />}
      <ItemComponent bgColor="blue.400" type={item.type} width={item.width}>
        <Text color="white">{item.type}</Text>
      </ItemComponent>
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
    <SortableItem itemId={itemId} rowId={rowId} type={item.type}>
      <Component item={item} />
    </SortableItem>
  );
};

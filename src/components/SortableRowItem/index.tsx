import { Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { SortableItem } from "../../dnd/SortableItem";
import { itemsSelector } from "../../modules/itemsSlice";
import { RootState } from "../../modules/store";
import { PlaceHolder } from "../PlaceHolder";
import { ItemComponent } from "../ui/Item";

type Props = {
  itemId: string;
};

export const SortableRowItem: React.FC<Props> = ({ itemId }) => {
  // overのIdと一致したとき
  const placeholderShown = false;

  const item = useSelector((state: RootState) =>
    itemsSelector.selectById(state, itemId)
  );

  if (!item) {
    return null;
  }

  return (
    <SortableItem itemId={itemId}>
      <Flex gap={2}>
        {placeholderShown && <PlaceHolder />}
        <ItemComponent bgColor="blue.400" type={item.type}>
          <Text color="white">{item.itemId}</Text>
        </ItemComponent>
      </Flex>
    </SortableItem>
  );
};

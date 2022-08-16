import { Flex, Text } from "@chakra-ui/react";
import { SortableItem } from "../../dnd/SortableItem";
import { createSortableItemId } from "../../lib/id";
import { Item } from "../../ui/Item";

type Props = {
  itemId: string;
};

export const SortableLineItem: React.FC<Props> = ({ itemId }) => {
  return (
    <Flex gap={2}>
      <SortableItem itemId={itemId}>
        <Item bgColor="blue.400">
          <Text color="white">{itemId}</Text>
        </Item>
      </SortableItem>
    </Flex>
  );
};

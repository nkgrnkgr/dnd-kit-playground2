import { Flex, Text } from "@chakra-ui/react";
import { SortableItem } from "../../dnd/SortableItem";
import { Item } from "../../ui/Item";

type Props = {
  itemId: string;
};

const Component: React.FC<Props> = ({ itemId }) => {
  return (
    <Flex gap={2}>
      <Item bgColor="blue.400">
        <Text color="white">{itemId}</Text>
      </Item>
    </Flex>
  );
};

export const SortableLineItem: React.FC<Props> = ({ itemId }) => {
  return (
    <SortableItem itemId={itemId}>
      <Component itemId={itemId} />
    </SortableItem>
  );
};

import { Flex, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { SortableItem } from "../../dnd/SortableItem";
import { Item } from "../../ui/Item";
import { PlaceHolder } from "./PlaceHolder";
import { Transparent } from "./Transparent";

type Props = {
  itemId: string;
};

const Component: React.FC<Props> = ({ itemId }) => {
  const { isOver, isDragging, isSorting } = useSortable({
    id: itemId,
  });

  const placeholderShown = isOver && !isDragging;

  return (
    <Flex gap={2}>
      {placeholderShown && <PlaceHolder />}
      {isDragging ? (
        <Transparent />
      ) : (
        <Item bgColor="blue.400">
          <Text color="white">{itemId}</Text>
        </Item>
      )}
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

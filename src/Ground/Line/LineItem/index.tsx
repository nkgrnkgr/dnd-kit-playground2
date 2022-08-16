import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "../../../dnd/Draggable";
import { Droppable } from "../../../dnd/Droppable";
import { Item } from "../../../ui/Item";
import { PlaceHolder } from "../PlaceHolder";

type Props = {
  itemId: string;
};

export const createDroppableItemId = (itemId: string) => `droppable-${itemId}`;
export const createDraggableItemId = (itemId: string) => `draggable-${itemId}`;

export const Component: React.FC<Props> = ({ itemId }) => {
  const { isOver, active } = useDroppable({
    id: createDroppableItemId(itemId),
  });

  const isActive = active?.id === createDraggableItemId(itemId);

  return (
    <Flex gap={2}>
      {isOver && !isActive && <PlaceHolder />}
      <Draggable itemId={createDraggableItemId(itemId)}>
        <Item bgColor="blue.400">
          <Text color={isOver ? "red" : "white"}>{itemId}</Text>
        </Item>
      </Draggable>
    </Flex>
  );
};

export const LineItem: React.FC<Props> = ({ itemId }) => {
  return (
    <Droppable droppableId={createDroppableItemId(itemId)}>
      <Component itemId={itemId} />
    </Droppable>
  );
};

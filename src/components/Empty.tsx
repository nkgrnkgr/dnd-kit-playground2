import { Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Droppable } from "./dnd/Droppable";
import { PlaceHolder } from "./PlaceHolder";

type ComponentProps = {
  itemId: string;
};

const Component: React.FC<ComponentProps> = ({ itemId }) => {
  const { isOver } = useDroppable({ id: itemId });
  return <Flex>{isOver && <PlaceHolder />}</Flex>;
};

type Props = {
  itemId: string;
  rowId: string;
};

export const Empty: React.FC<Props> = ({ itemId, rowId }) => {
  return (
    <Droppable
      style={{ flex: 1, minHeight: "56px", backgroundColor: "#fff" }}
      droppableId={itemId}
      rowId={rowId}
    >
      <Component itemId={itemId} />
    </Droppable>
  );
};

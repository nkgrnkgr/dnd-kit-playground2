import { Box, Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Droppable } from "../dnd/Droppable";
import { PlaceHolder } from "./PlaceHolder";

type Props = {
  itemId: string;
};

const Component: React.FC<Props> = ({ itemId }) => {
  const { isOver } = useDroppable({ id: itemId });
  return <Flex>{isOver && <PlaceHolder />}</Flex>;
};

export const Empty: React.FC<Props> = ({ itemId }) => {
  return (
    <Droppable
      style={{ flex: 1, minHeight: "56px", backgroundColor: "#fff" }}
      droppableId={itemId}
    >
      <Component itemId={itemId} />
    </Droppable>
  );
};

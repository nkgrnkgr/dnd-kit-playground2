import { Box, Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Droppable } from "../../../dnd/Droppable";
import { createEmptyLineId } from "../../../lib/id";
import { PlaceHolder } from "../PlaceHolder";

type Props = {
  lineId: string;
};

export const Component: React.FC<Props> = ({ lineId }) => {
  const { isOver } = useDroppable({
    id: createEmptyLineId(lineId),
  });

  return (
    <Flex gap={2}>
      {isOver && <PlaceHolder />}
      <Box
        sx={{
          padding: "16px",
          flex: "1",
        }}
      ></Box>
    </Flex>
  );
};

export const EmptyLine: React.FC<Props> = ({ lineId }) => {
  return (
    <Droppable
      style={{
        flex: "1",
        backgroundColor: "white",
        minHeight: "56px",
      }}
      droppableId={createEmptyLineId(lineId)}
    >
      <Component lineId={lineId} />
    </Droppable>
  );
};

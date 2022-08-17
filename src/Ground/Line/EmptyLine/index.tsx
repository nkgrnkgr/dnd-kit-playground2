import { Box, Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Droppable } from "../../../dnd/Droppable";
import { PlaceHolder } from "../PlaceHolder";

type Props = {
  lineId: string;
};

export const EMPTY_LINE_ID = "EMPTY_LINE_ID";

export const Component: React.FC<Props> = ({ lineId }) => {
  const { isOver } = useDroppable({
    id: `${EMPTY_LINE_ID}-${lineId}`,
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
        backgroundColor: "red",
        minHeight: "56px",
      }}
      droppableId={`${EMPTY_LINE_ID}-${lineId}`}
    >
      <Component lineId={lineId} />
    </Droppable>
  );
};

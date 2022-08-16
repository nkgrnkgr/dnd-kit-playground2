import { Box, Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Droppable } from "../../../dnd/Droppable";
import { PlaceHolder } from "../PlaceHolder";

type Props = {
  //
};

export const EMPTY_LINE_ID = "EMPTY_LINE_ID";

export const Component: React.FC<Props> = () => {
  const { isOver } = useDroppable({
    id: EMPTY_LINE_ID,
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

export const EmptyLine: React.FC<Props> = () => {
  return (
    <Droppable
      style={{
        flex: "1",
      }}
      droppableId={EMPTY_LINE_ID}
    >
      <Component />
    </Droppable>
  );
};

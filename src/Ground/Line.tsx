import { Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { GROUND_DROPPABLE_ID } from ".";
import { PlaceHolder } from "./PlaceHolder";

type Props = {
  //
};

export const Line: React.FC<Props> = () => {
  const { isOver } = useDroppable({ id: GROUND_DROPPABLE_ID });

  return (
    <Flex
      sx={{
        mt: "12px",
      }}
      gap={2}
    >
      {isOver && <PlaceHolder />}
    </Flex>
  );
};

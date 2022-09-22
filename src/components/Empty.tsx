import { Box, Flex } from "@chakra-ui/react";
import { Droppable } from "../dnd/Droppable";
import { PlaceHolder } from "./PlaceHolder";

type Props = {
  itemId: string;
};

export const Empty: React.FC<Props> = ({ itemId }) => {
  const placeHolderShown = false;
  return (
    <Droppable
      style={{ flex: 1, minHeight: "56px", backgroundColor: "#fff" }}
      droppableId={itemId}
    >
      <Flex>
        {placeHolderShown && <PlaceHolder />}
        <Box>Empty</Box>
      </Flex>
    </Droppable>
  );
};

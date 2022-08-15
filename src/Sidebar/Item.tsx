import { Center, Icon, Spacer, Text } from "@chakra-ui/react";
import { RiDragMove2Fill } from "react-icons/ri";
import { Draggable } from "../dnd/Draggable";

type Props = {
  itemId: number;
};

export const Item: React.FC<Props> = ({ itemId }) => {
  return (
    <Draggable itemId={itemId}>
      <Center p="4" w="200px" bg="tomato">
        <Icon
          sx={{
            mr: "4px",
          }}
          color="white"
          as={RiDragMove2Fill}
        />
        <Text color="white">Draggable {itemId}</Text>
      </Center>
    </Draggable>
  );
};

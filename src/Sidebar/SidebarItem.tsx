import { Center, Icon, Spacer, Text } from "@chakra-ui/react";
import { RiDragMove2Fill } from "react-icons/ri";
import { Draggable } from "../dnd/Draggable";
import { Item } from "../ui/Item";

type Props = {
  itemId: number;
};

export const SidebarItem: React.FC<Props> = ({ itemId }) => {
  return (
    <Draggable itemId={itemId}>
      <Item bgColor="tomato">
        <Icon
          sx={{
            mr: "4px",
          }}
          color="white"
          as={RiDragMove2Fill}
        />
        <Text color="white">Draggable {itemId}</Text>
      </Item>
    </Draggable>
  );
};
import { Icon, Text } from "@chakra-ui/react";
import { RiDragMove2Fill } from "react-icons/ri";
import { ItemComponent } from "../components/ui/Item";
import { Draggable } from "../dnd/Draggable";
import { Item as ContentItem } from "../modules/itemsSlice";

type Props = {
  item: ContentItem;
};

export const SidebarItem: React.FC<Props> = ({ item }) => {
  return (
    <Draggable itemId={item.itemId} type={item.type}>
      <ItemComponent bgColor="tomato" type={item.type}>
        <Icon
          sx={{
            mr: "4px",
          }}
          color="white"
          as={RiDragMove2Fill}
        />
        <Text color="white">{item.itemId}</Text>
      </ItemComponent>
    </Draggable>
  );
};

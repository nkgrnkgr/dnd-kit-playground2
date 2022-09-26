import { Icon, Text } from "@chakra-ui/react";
import { RiDragMove2Fill } from "react-icons/ri";
import { DEFAULT_WIDTH, ItemComponent } from "../../components/helper/Item";
import { Item as ContentItem } from "../../modules/itemsSlice";
import { Draggable } from "../helper/dnd/Draggable";

type Props = {
  item: ContentItem;
};

export const SidebarItem: React.FC<Props> = ({ item }) => {
  return (
    <Draggable itemId={item.itemId} type={item.type}>
      <ItemComponent bgColor="tomato" type={item.type} width={DEFAULT_WIDTH}>
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

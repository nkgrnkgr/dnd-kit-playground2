import { Icon, Text } from "@chakra-ui/react";
import { RiDragMove2Fill } from "react-icons/ri";
import {
  DEFAULT_WIDTH,
  Item as ContentItem,
  ITEM_HIGHT,
} from "../../modules/itemsSlice";
import { CenterComponent } from "../helper/Center";
import { Draggable } from "../helper/dnd/Draggable";

type Props = {
  item: ContentItem;
};

export const SidebarItem: React.FC<Props> = ({ item }) => {
  return (
    <Draggable
      id={item.itemId}
      data={{
        itemType: item.type,
      }}
    >
      <CenterComponent
        backgroundColor="tomato"
        width={`${DEFAULT_WIDTH}px`}
        height={ITEM_HIGHT[item.type]}
      >
        <Icon
          sx={{
            mr: "4px",
          }}
          color="white"
          as={RiDragMove2Fill}
        />
        <Text color="white">{item.itemId}</Text>
      </CenterComponent>
    </Draggable>
  );
};

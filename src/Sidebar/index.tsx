import { Box } from "@chakra-ui/react";
import { Item, ITEM_TYPE } from "../modules/itemsSlice";
import { Card } from "../ui/Card";
import { SidebarItem } from "./SidebarItem";

export const SIDEBAR_ITEMS: Item[] = [
  {
    itemId: "1",
    isPlaceHolder: false,
    type: ITEM_TYPE.SMALL,
  },
  {
    itemId: "2",
    isPlaceHolder: false,
    type: ITEM_TYPE.MIDDLE,
  },
  {
    itemId: "3",
    isPlaceHolder: false,
    type: ITEM_TYPE.LARGE,
  },
];

export const SideBar: React.FC = () => {
  return (
    <Card>
      <Box
        sx={{
          h: "100vh",
        }}
      >
        {SIDEBAR_ITEMS.map((item) => (
          <Box
            key={item.itemId}
            sx={{
              m: "12px",
            }}
          >
            <SidebarItem item={item} />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

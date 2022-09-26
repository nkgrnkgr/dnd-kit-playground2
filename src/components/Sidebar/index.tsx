import { Box } from "@chakra-ui/react";
import { Card } from "../../components/helper/Card";
import { Item, ITEM_TYPE } from "../../modules/itemsSlice";
import { SidebarItem } from "./SidebarItem";

export const SIDEBAR_ITEMS: Item[] = [
  {
    itemId: "1",
    type: ITEM_TYPE.SMALL,
  },
  {
    itemId: "2",
    type: ITEM_TYPE.MIDDLE,
  },
  {
    itemId: "3",
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

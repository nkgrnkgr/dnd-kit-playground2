import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "../ui/Card";
import { SidebarItem } from "./SidebarItem";

export const SideBar: React.FC = () => {
  const [itemIds] = useState<string[]>(["1", "2", "3"]);

  return (
    <Card>
      <Box
        sx={{
          h: "100vh",
        }}
      >
        {itemIds.map((itemId) => (
          <Box
            key={itemId}
            sx={{
              m: "12px",
            }}
          >
            <SidebarItem itemId={itemId} />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

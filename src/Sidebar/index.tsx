import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "../ui/Card";
import { Item } from "./Item";

export const SideBar: React.FC = () => {
  const [itemIds] = useState<number[]>([1, 2, 3, 4, 5]);

  return (
    <Card>
      <Box
        sx={{
          h: "100vh",
        }}
      >
        {itemIds.map((itemId) => (
          <Box
            sx={{
              m: "12px",
            }}
          >
            <Item key={itemId} itemId={itemId} />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

import { Box, Flex } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";

type Props = {
  rowId: string;
};

export const Row: React.FC<Props> = ({ rowId }) => {
  return (
    <Box
      sx={{
        w: "100%",
        minHeight: "56px",
      }}
    >
      <SortableContext items={ids}>
        <Flex
          sx={{
            mt: "12px",
          }}
          gap={2}
        >
          {}
        </Flex>
      </SortableContext>
    </Box>
  );
};

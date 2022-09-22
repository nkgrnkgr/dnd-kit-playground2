import { Box, Flex } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import { Droppable } from "../../dnd/Droppable";
import { rowsSelector } from "../../modules/rowsSlice";
import { RootState } from "../../modules/store";
import { Empty } from "../Empty";
import { SortableRowItem } from "../SortableRowItem";

type Props = {
  rowId: string;
};

export const Row: React.FC<Props> = ({ rowId }) => {
  const itemIds =
    useSelector(
      (state: RootState) => rowsSelector.selectById(state, rowId)?.itemIds
    ) || [];

  return (
    <Box
      sx={{
        w: "100%",
        minHeight: "56px",
      }}
    >
      <SortableContext items={itemIds}>
        <Droppable droppableId={rowId}>
          <Flex
            sx={{
              mt: "12px",
            }}
            gap={2}
          >
            {itemIds.map((id) => (
              <SortableRowItem key={id} itemId={id} />
            ))}
            <Empty itemId={rowId} />
          </Flex>
        </Droppable>
      </SortableContext>
    </Box>
  );
};

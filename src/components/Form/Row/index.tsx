import { Box, Flex } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import { rowsSelector } from "../../../modules/rowsSlice";
import { RootState } from "../../../modules/store";
import { Droppable } from "../../helper/dnd/Droppable";
import { DragHandler } from "./DragHandler";
import { Empty } from "./Empty";
import { SortableRowItem } from "./SortableRowItem";

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
        <Droppable droppableId={rowId} rowId={rowId}>
          <Flex
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <DragHandler />
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              {itemIds.map((id) => (
                <SortableRowItem key={id} itemId={id} rowId={rowId} />
              ))}
            </Box>
            <Empty itemId={`${rowId}-empty`} rowId={rowId} />
          </Flex>
        </Droppable>
      </SortableContext>
    </Box>
  );
};

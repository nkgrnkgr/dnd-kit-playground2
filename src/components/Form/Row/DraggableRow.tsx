import { Box, Flex, IconButton } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";
import { FaGripLinesVertical } from "react-icons/fa";
import { useSelector } from "react-redux";
import { rowsSelector } from "../../../modules/rowsSlice";
import { RootState } from "../../../modules/store";
import { Droppable } from "../../helper/dnd/Droppable";
import { Empty } from "./Empty";

type Props = {
  rowId: string;
  children: React.ReactNode;
};

export const DraggableRow: React.FC<Props> = ({ rowId, children }) => {
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
            }}
          >
            <IconButton
              aria-label="dragHandler"
              icon={<FaGripLinesVertical />}
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {children}
            </Box>
            <Empty itemId={`${rowId}-empty`} rowId={rowId} />
          </Flex>
        </Droppable>
      </SortableContext>
    </Box>
  );
};

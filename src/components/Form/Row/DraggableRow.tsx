import { Box, Flex, IconButton } from "@chakra-ui/react";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { FaGripLinesVertical } from "react-icons/fa";
import { useSelector } from "react-redux";
import { rowsSelector } from "../../../modules/rowsSlice";
import { RootState } from "../../../modules/store";
import { Empty } from "./Empty";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  rowId: string;
  children: React.ReactNode;
};

export const DraggableRow: React.FC<Props> = ({ rowId, children }) => {
  const itemIds =
    useSelector(
      (state: RootState) => rowsSelector.selectById(state, rowId)?.itemIds
    ) || [];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: rowId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      sx={{
        w: "100%",
        minHeight: "56px",
      }}
      ref={setNodeRef}
      style={style}
    >
      <Flex
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="dragHandler"
          icon={<FaGripLinesVertical />}
          {...attributes}
          {...listeners}
        />

        <SortableContext
          strategy={horizontalListSortingStrategy}
          items={itemIds}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            {children}
          </Box>
          <Empty itemId={`${rowId}-empty`} rowId={rowId} />
        </SortableContext>
      </Flex>
    </Box>
  );
};

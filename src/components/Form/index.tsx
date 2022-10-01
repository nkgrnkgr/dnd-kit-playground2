import { Box, VStack } from "@chakra-ui/react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import { rowsSelector } from "../../modules/rowsSlice";
import { Row } from "./Row";

export const Form = () => {
  const rowIds = useSelector(rowsSelector.selectIds);

  return (
    <Box
      sx={{
        bgColor: "gray.100",
        p: "12px",
        h: "100vh",
        minWidth: "800px",
        width: "100%",
      }}
    >
      <VStack spacing="12px">
        <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
          {rowIds.map((rowId) => (
            <Row key={rowId} rowId={rowId.toString()} />
          ))}
        </SortableContext>
      </VStack>
    </Box>
  );
};

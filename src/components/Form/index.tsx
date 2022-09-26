import { Box, VStack } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";
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
      }}
    >
      <VStack spacing="12px">
        <SortableContext items={rowIds}>
          {rowIds.map((rowId) => (
            <Row key={rowId} rowId={rowId.toString()} />
          ))}
        </SortableContext>
      </VStack>
    </Box>
  );
};

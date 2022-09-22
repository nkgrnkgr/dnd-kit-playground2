import { Box, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { rowsSelector } from "../modules/rowsSlice";
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
        {rowIds.map((rowId) => (
          <Row key={rowId} rowId={rowId.toString()} />
        ))}
      </VStack>
    </Box>
  );
};

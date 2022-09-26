import { Box, Code, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { itemsSelector } from "./modules/itemsSlice";
import { rowsSelector } from "./modules/rowsSlice";
import { RootState } from "./modules/store";

export const Result: React.FC = () => {
  const rows = useSelector((state: RootState) => rowsSelector.selectAll(state));
  const items = useSelector((state: RootState) =>
    itemsSelector.selectAll(state)
  );
  const { activeElementProperty } = useSelector(
    (state: RootState) => state.page
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Text>Items</Text>
      <pre>
        <Code>{JSON.stringify(items, null, 2)}</Code>
      </pre>
      <Text>Rows</Text>
      <pre>
        <Code>{JSON.stringify(rows, null, 2)}</Code>
      </pre>
      <Text>ActiveElementProperty</Text>
      <pre>
        <Code>{JSON.stringify(activeElementProperty, null, 2)}</Code>
      </pre>
    </Box>
  );
};

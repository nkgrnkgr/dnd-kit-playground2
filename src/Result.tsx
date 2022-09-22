import { Box, Code, Text } from "@chakra-ui/react";

export const Result: React.FC = () => {
  return (
    <Box>
      <Text>A</Text>
      <pre>
        <Code>{JSON.stringify({}, null, 2)}</Code>
      </pre>
      <Text>B</Text>
      <pre>
        <Code>{JSON.stringify({}, null, 2)}</Code>
      </pre>
    </Box>
  );
};

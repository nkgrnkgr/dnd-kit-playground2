import { Center, Text } from "@chakra-ui/react";

type Props = {
  itemId: number;
};

export const Item: React.FC<Props> = ({ itemId }) => {
  return (
    <Center p="4" w="200px" bg="teal.100">
      <Text color="white">Item {itemId}</Text>
    </Center>
  );
};

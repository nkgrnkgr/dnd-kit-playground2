import { Center, Text } from "@chakra-ui/react";

type Props = {
  itemId: number;
};

export const Item: React.FC<Props> = ({ itemId }) => {
  return (
    <Center p="4" w="100px" bg="tomato">
      <Text color="white">Box {itemId}</Text>
    </Center>
  );
};

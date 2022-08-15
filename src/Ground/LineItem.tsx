import { Text } from "@chakra-ui/react";
import { Item } from "../ui/Item";

type Props = {
  itemId: string;
};

export const LineItem: React.FC<Props> = ({ itemId }) => {
  return (
    <Item bgColor="blue.400">
      <Text color="white">{itemId}</Text>
    </Item>
  );
};

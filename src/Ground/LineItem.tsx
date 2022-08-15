import { Text } from "@chakra-ui/react";
import { Item } from "../ui/Item";

type Props = {
  itemId: string;
};

export const LineItem: React.FC<Props> = ({ itemId }) => {
  return (
    <Item bgColor="teal.100">
      <Text color="white">Item {itemId}</Text>
    </Item>
  );
};

import { Flex, Text } from "@chakra-ui/react";
import { SortableItem } from "../../../dnd/SortableItem";
import { Item } from "../../../ui/Item";
import { PlaceHolder } from ".././PlaceHolder";
import { useSortableLineItemState } from "./useSortableLineItemState";

type Props = {
  itemId: string;
};

const Component: React.FC<Props> = ({ itemId }) => {
  const { lineId, lineContent, placeholderShown } =
    useSortableLineItemState(itemId);

  if (!lineContent) {
    return null;
  }

  const { from } = lineContent;

  return (
    <Flex gap={2}>
      {placeholderShown && <PlaceHolder />}
      <Item bgColor="blue.400">
        <Text color="white">
          {lineId} {from}
        </Text>
      </Item>
    </Flex>
  );
};

export const SortableLineItem: React.FC<Props> = ({ itemId }) => {
  return (
    <SortableItem itemId={itemId}>
      <Component itemId={itemId} />
    </SortableItem>
  );
};

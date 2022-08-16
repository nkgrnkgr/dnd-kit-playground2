import { Flex, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { SortableItem } from "../../dnd/SortableItem";
import { getIdType } from "../../lib/id";
import { Item } from "../../ui/Item";
import { PlaceHolder } from "./PlaceHolder";

type Props = {
  itemId: string;
};

const Component: React.FC<Props> = ({ itemId }) => {
  const { isOver, active } = useSortable({
    id: itemId,
  });

  // サイドバーからドラッグ中に over状態だと Placeholderを出したい
  if (getIdType(active?.id.toString() || "") === "draggable" && isOver) {
    return (
      <Flex gap={2}>
        <PlaceHolder />
        <Item bgColor="blue.400">
          <Text color="white">{itemId}</Text>
        </Item>
      </Flex>
    );
  }

  if (getIdType(active?.id.toString() || "") === "sortable" && isOver) {
    return <PlaceHolder />;
  }

  return (
    <Flex gap={2}>
      <Item bgColor="blue.400">
        <Text color="white">{itemId}</Text>
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

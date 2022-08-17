import { Flex, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { useRecoilValue } from "recoil";
import { SortableItem } from "../../dnd/SortableItem";
import { extractIds } from "../../lib/id";
import { lineContentState } from "../../store/line";
import { Item } from "../../ui/Item";

type Props = {
  itemId: string;
};

const Component: React.FC<Props> = ({ itemId }) => {
  const { isOver, active, isDragging } = useSortable({
    id: itemId,
  });
  const [lineId] = extractIds(itemId);
  const lineContents = useRecoilValue(lineContentState(lineId));
  const found = lineContents.find((c) => c.contentId === itemId);
  if (!found) {
    return null;
  }

  // 追加
  // サイドバーからドラッグ中に over状態だと Placeholderを出したい
  // if (getIdType(active?.id.toString() || "") === "draggable" && isOver) {
  //   return (
  //     <Flex gap={2}>
  //       <PlaceHolder />
  //       <Item bgColor="blue.400">
  //         <Text color="white">{itemId}</Text>
  //       </Item>
  //     </Flex>
  //   );
  // }

  // 移動
  // if (getIdType(active?.id.toString() || "") === "sortable" && isDragging) {
  //   return <PlaceHolder />;
  // }

  return (
    <Flex gap={2}>
      <Item bgColor="blue.400">
        <Text color="white">
          {lineId} {found.from}
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

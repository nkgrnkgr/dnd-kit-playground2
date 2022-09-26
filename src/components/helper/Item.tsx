import { Center } from "@chakra-ui/react";
import { Item, ItemType, ITEM_TYPE } from "../../modules/itemsSlice";

type Props = {
  children: React.ReactNode;
  bgColor: string;
  type: Item["type"];
  width: string;
};

export const ITEM_HIGHT: Record<ItemType, string> = {
  [ITEM_TYPE.SMALL]: "56px",
  [ITEM_TYPE.MIDDLE]: "112px",
  [ITEM_TYPE.LARGE]: "168px",
};

export const DEFAULT_WIDTH = "200px";

export const ItemComponent: React.FC<Props> = ({
  children,
  bgColor,
  type,
  width,
}) => {
  return (
    <Center h={ITEM_HIGHT[type]} p="4" w={width} bg={bgColor}>
      {children}
    </Center>
  );
};

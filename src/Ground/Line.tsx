import { Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { GROUND_DROPPABLE_ID } from ".";
import { lineIdsState } from "../store/line";
import { LineItem } from "./LineItem";
import { PlaceHolder } from "./PlaceHolder";

type Props = {
  lineId: string;
};

export const Line: React.FC<Props> = ({ lineId }) => {
  const [lineIds] = useRecoilState(lineIdsState(`${lineId}`));

  const { isOver } = useDroppable({ id: GROUND_DROPPABLE_ID });

  return (
    <Flex
      sx={{
        mt: "12px",
      }}
      gap={2}
    >
      {isOver && <PlaceHolder />}
      {lineIds.map((lineId) => (
        <LineItem itemId={lineId} />
      ))}
    </Flex>
  );
};

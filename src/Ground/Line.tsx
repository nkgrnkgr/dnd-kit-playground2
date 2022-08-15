import { Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { GROUND_DROPPABLE_ID } from ".";
import { lineContentState } from "../store/line";
import { PlaceHolder } from "./PlaceHolder";
import { Switcher } from "./Switcher";

type Props = {
  lineId: string;
};

export const Line: React.FC<Props> = ({ lineId }) => {
  const [lineContents] = useRecoilState(lineContentState(`${lineId}`));

  const { isOver } = useDroppable({ id: GROUND_DROPPABLE_ID });

  return (
    <Flex
      sx={{
        mt: "12px",
      }}
      gap={2}
    >
      {isOver && <PlaceHolder />}
      {lineContents.map((content) => (
        <Switcher key={content.lineId} lineContent={content} />
      ))}
    </Flex>
  );
};

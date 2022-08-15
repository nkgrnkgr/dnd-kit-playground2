import { Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { GROUND_DROPPABLE_ID } from ".";
import { LineContent, lineContentState } from "../store/line";
import { Switcher } from "./Switcher";

type Props = {
  lineId: string;
};

const PLACE_HOLDER_CONTENT: LineContent = {
  lineId: "placeholder",
  lineType: "placeholder",
};

const createLineContents = (
  lineContents: LineContent[],
  isOver: boolean,
  index: number
): LineContent[] => {
  if (index === 0) {
    return [PLACE_HOLDER_CONTENT, ...lineContents];
  }

  const pre = lineContents.slice(0, index);
  const after = lineContents.slice(index, lineContents.length);

  const contents = isOver
    ? [...pre, PLACE_HOLDER_CONTENT, ...after]
    : lineContents;

  return contents;
};

export const Line: React.FC<Props> = ({ lineId }) => {
  const [lineContents] = useRecoilState(lineContentState(`${lineId}`));

  const { isOver } = useDroppable({ id: GROUND_DROPPABLE_ID });

  const created = createLineContents(lineContents, isOver, 1);

  console.log(created.length);
  return (
    <Flex
      sx={{
        mt: "12px",
      }}
      gap={2}
    >
      {created.map((content, index) => (
        <Switcher key={index} lineContent={content} />
      ))}
    </Flex>
  );
};

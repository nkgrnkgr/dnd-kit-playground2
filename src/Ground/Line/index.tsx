import { Box, Flex } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";
import { useRecoilState } from "recoil";
import { Droppable } from "../../dnd/Droppable";
import { lineContentState } from "../../store/line";
import { EmptyLine } from "./EmptyLine";
import { SortableLineItem } from "./SortableLineItem";

type Props = {
  lineId: string;
};

export const Line: React.FC<Props> = ({ lineId }) => {
  const [lineContents] = useRecoilState(lineContentState(`${lineId}`));
  const ids = lineContents.map((c) => c.contentId);

  return (
    <Box
      sx={{
        w: "100%",
        minHeight: "56px",
      }}
    >
      <SortableContext items={ids}>
        <Droppable droppableId={lineId}>
          <Flex
            sx={{
              mt: "12px",
            }}
            gap={2}
          >
            {lineContents.map((content) => (
              <SortableLineItem
                key={content.contentId}
                itemId={content.contentId}
              />
            ))}
            <EmptyLine lineId={lineId} />
          </Flex>
        </Droppable>
      </SortableContext>
    </Box>
  );
};

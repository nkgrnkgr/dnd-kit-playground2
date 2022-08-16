import { Flex } from "@chakra-ui/react";
import { SortableContext } from "@dnd-kit/sortable";
import { useRecoilState } from "recoil";
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
    <Flex
      sx={{
        mt: "12px",
      }}
      gap={2}
    >
      <SortableContext items={ids}>
        {lineContents.map((content) => (
          <SortableLineItem
            key={content.contentId}
            itemId={content.contentId}
          />
        ))}
      </SortableContext>
      <EmptyLine />
    </Flex>
  );
};

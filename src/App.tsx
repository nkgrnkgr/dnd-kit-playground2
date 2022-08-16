import { Box, Code, Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { Ground } from "./Ground";
import { EMPTY_LINE_ID } from "./Ground/Line/EmptyLine";
import { insertToArray } from "./lib/insertToArray";
import { SideBar } from "./Sidebar";
import { LineContent, lineContentState } from "./store/line";

export const App: React.FC = () => {
  const [lineContents, setLineContents] = useRecoilState(
    lineContentState("line1")
  );

  const droppableIds = [EMPTY_LINE_ID];

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && droppableIds.includes(event.over.id.toString())) {
      if (event.active.id) {
        const overId = event.over.id.toString();
        const overIndex = lineContents.findIndex(
          (content) => content.lineId === overId.split("droppable-")[1]
        );
        const activeId = event.active.id.toString();
        const inserted = insertToArray<LineContent>(
          lineContents,
          { lineId: `sortable-${activeId}`, lineType: "normal" },
          lineContents.length
        );
        setLineContents([...inserted]);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Flex gap="12">
        <SideBar />
        <Ground />
        <Box>
          <pre>
            <Code>{JSON.stringify(lineContents, null, 2)}</Code>
          </pre>
        </Box>
      </Flex>
    </DndContext>
  );
};

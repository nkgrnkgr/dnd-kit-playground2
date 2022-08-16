import { Box, Code, Flex } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { PresenceContext } from "framer-motion";
import { useRecoilState } from "recoil";
import { Ground } from "./Ground";
import { EMPTY_LINE_ID } from "./Ground/Line/EmptyLine";
import { createDroppableItemId } from "./Ground/Line/LineItem";
import { insertToArray } from "./lib/insertToArray";
import { replaceArrayElements } from "./lib/replaceArrayElements";
import { SideBar } from "./Sidebar";
import { LineContent, lineContentState } from "./store/line";

export const App: React.FC = () => {
  const [lineContents, setLineContents] = useRecoilState(
    lineContentState("line1")
  );

  const droppableIds = [
    EMPTY_LINE_ID,
    ...lineContents.map((c) => createDroppableItemId(c.lineId)),
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && droppableIds.includes(event.over.id.toString())) {
      if (event.active.id) {
        const overId = event.over.id.toString();
        const overIndex = lineContents.findIndex(
          (content) => content.lineId === overId.split("droppable-")[1]
        );
        const activeId = event.active.id.toString();
        const activeIndex = lineContents.findIndex(
          (content) => content.lineId === activeId.split("draggable-")[1]
        );

        if (activeId.startsWith("draggable-")) {
          // 移動
          console.log(overIndex, activeIndex);
          if (overIndex > -1 && activeIndex > -1) {
            const replaced = replaceArrayElements(
              lineContents,
              overIndex,
              activeIndex
            );
            setLineContents([...replaced]);
          }
        } else {
          // 追加
          const inserted = insertToArray<LineContent>(
            lineContents,
            {
              lineId: activeId,
              lineType: "normal",
            },
            overIndex === -1 ? lineContents.length + 1 : overIndex
          );
          setLineContents([...inserted]);
        }
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

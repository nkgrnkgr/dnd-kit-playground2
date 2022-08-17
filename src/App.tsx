import { Box, Code, Flex, Text } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Ground } from "./Ground";
import { OverLayItem } from "./Ground/Line/OverlayItem";
import { createContentId, createEmptyLineId, extractIds } from "./lib/id";
import { insertToArray } from "./lib/insertToArray";
import { SideBar } from "./Sidebar";
import { LineContent, lineContentState } from "./store/line";

export const App: React.FC = () => {
  const [lineContentsA, setLineContentsA] = useRecoilState(
    lineContentState("A")
  );
  const [lineContentsB, setLineContentsB] = useRecoilState(
    lineContentState("B")
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const droppableIds = [createEmptyLineId("A"), createEmptyLineId("B")];

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && droppableIds.includes(event.over.id.toString())) {
      const overId = event.over.id.toString();
      if (!activeId) {
        return;
      }
      const [overLineId] = extractIds(overId);
      // const [activeLineId, activeContentId] = extractIds(activeId);
      if (overLineId === "A") {
        const found = lineContentsA.find((c) => c.contentId === activeId);
        // 追加
        if (!found) {
          const overIdIndex = lineContentsA.findIndex(
            (c) => c.contentId === overId
          );
          const inserted = insertToArray<LineContent>(
            lineContentsA,
            {
              contentId: createContentId(overLineId),
              lineType: "normal",
              from: activeId,
            },
            overIdIndex
          );

          setLineContentsA([...inserted]);
          return;
        }

        // ソート
      }
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Flex gap="12">
        <SideBar />
        <Ground />
        <Box>
          <Text>A</Text>
          <pre>
            <Code>{JSON.stringify(lineContentsA, null, 2)}</Code>
          </pre>
          <Text>B</Text>
          <pre>
            <Code>{JSON.stringify(lineContentsB, null, 2)}</Code>
          </pre>
        </Box>
      </Flex>
      <DragOverlay>
        {/* 追加 or ソート？ */}
        {activeId ? <OverLayItem itemId={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

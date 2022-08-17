import { Box, Code, Flex, Text } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
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

  const droppableIds = [
    createEmptyLineId("A"),
    createEmptyLineId("B"),
    ...lineContentsA.map((c) => c.contentId),
    ...lineContentsB.map((c) => c.contentId),
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && droppableIds.includes(event.over.id.toString())) {
      const overId = event.over.id.toString();
      if (!activeId) {
        return;
      }
      const [overLineId] = extractIds(overId);

      if (overLineId === "A") {
        const found = lineContentsA.find((c) => c.contentId === activeId);
        const overIdIndex = lineContentsA.findIndex(
          (c) => c.contentId === overId
        );
        // 追加
        if (!found) {
          const inserted = insertToArray<LineContent>(
            lineContentsA,
            {
              contentId: createContentId(overLineId),
              lineType: "normal",
              from: activeId,
            },
            overIdIndex >= 0 ? overIdIndex : lineContentsA.length
          );

          setLineContentsA([...inserted]);
          return;
        }
        // ソート
        const activeIndex = lineContentsA.findIndex(
          (c) => c.contentId === activeId
        );
        const moved = arrayMove(lineContentsA, activeIndex, overIdIndex);
        setLineContentsA([...moved]);
        return;
      }

      if (overLineId === "B") {
        const found = lineContentsB.find((c) => c.contentId === activeId);
        const overIdIndex = lineContentsB.findIndex(
          (c) => c.contentId === overId
        );
        // 追加 & 削除
        if (!found) {
          const inserted = insertToArray<LineContent>(
            lineContentsB,
            {
              contentId: createContentId(overLineId),
              lineType: "normal",
              from: activeId,
            },
            overIdIndex >= 0 ? overIdIndex : lineContentsB.length
          );

          setLineContentsB([...inserted]);
          return;
        }
        // ソート
        const activeIndex = lineContentsB.findIndex(
          (c) => c.contentId === activeId
        );
        const moved = arrayMove(lineContentsB, activeIndex, overIdIndex);
        setLineContentsA([...moved]);
        return;
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

import { Box, Code, Flex, Text } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Ground } from "./Ground";
import { OverLayItem } from "./Ground/Line/OverlayItem";
import { createContentId, createEmptyLineId, extractIds } from "./lib/id";
import { insertToArray } from "./lib/insertToArray";
import { SideBar } from "./Sidebar";
import { activeElementPropertyState } from "./store/activeElementProperty";
import { LineContent, lineContentState } from "./store/line";

export const App: React.FC = () => {
  const setActiveElementProperty = useSetRecoilState(
    activeElementPropertyState
  );

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
        insertOrUpdate(
          lineContentsA,
          setLineContentsA,
          lineContentsB,
          setLineContentsB,
          activeId,
          overId
        );
        return;
      }
      if (overLineId === "B") {
        insertOrUpdate(
          lineContentsB,
          setLineContentsB,
          lineContentsA,
          setLineContentsA,
          activeId,
          overId
        );
        return;
      }
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
    setActiveElementProperty({
      height: event.active.rect.current.initial?.height,
      width: event.active.rect.current.initial?.width,
    });
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

const insertOrUpdate = (
  lineContentsOriginal: LineContent[],
  setLineContentsOriginal: (lineContents: LineContent[]) => void,
  lineContentsAnother: LineContent[],
  setLineContentsAnother: (lineContents: LineContent[]) => void,
  activeId: string,
  overId: string
) => {
  const found = lineContentsOriginal.find((c) => c.contentId === activeId);
  const overIdIndex = lineContentsOriginal.findIndex(
    (c) => c.contentId === overId
  );
  const [overLineId] = extractIds(overId);
  // 追加 & 削除
  if (!found) {
    const inserted = insertToArray<LineContent>(
      lineContentsOriginal,
      {
        contentId: createContentId(overLineId),
        lineType: "normal",
        from: activeId,
      },
      overIdIndex >= 0 ? overIdIndex : lineContentsOriginal.length
    );
    setLineContentsOriginal([...inserted]);

    // 削除
    const filtered = lineContentsAnother.filter(
      (c) => c.contentId !== activeId
    );
    setLineContentsAnother([...filtered]);
    return;
  }
  // ソート
  const activeIndex = lineContentsOriginal.findIndex(
    (c) => c.contentId === activeId
  );
  const moved = arrayMove(lineContentsOriginal, activeIndex, overIdIndex);
  setLineContentsOriginal([...moved]);
  return;
};

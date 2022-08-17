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
import { EMPTY_LINE_ID } from "./Ground/Line/EmptyLine";
import { OverLayItem } from "./Ground/Line/OverlayItem";
import { createSortableItemId, getIdFromDraggable, getIdType } from "./lib/id";
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

  const droppableIds = [
    `${EMPTY_LINE_ID}-A`,
    `${EMPTY_LINE_ID}-B`,
    ...lineContentsA.map((c) => c.contentId),
    ...lineContentsB.map((c) => c.contentId),
  ];

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && droppableIds.includes(event.over.id.toString())) {
      if (event.active.id) {
        const activeId = event.active.id.toString();
        const overId = event.over.id.toString();
        const type = getIdType(activeId);

        if (overId.split("-")[1].match("A")) {
          const overIdIndex = getOverIdIndex(lineContentsA, overId);
          if (type === "draggable") {
            const id = getIdFromDraggable(activeId);
            const inserted = insertToArray<LineContent>(
              lineContentsA,
              { contentId: createSortableItemId("A", id), lineType: "normal" },
              overIdIndex
            );
            setLineContentsA([...inserted]);
            return;
          }
          if (type === "sortable") {
            console.log(activeId);
            const activeIdIndex = getActiveIdIndex(lineContentsA, activeId);
            const moved = arrayMove(lineContentsA, activeIdIndex, overIdIndex);
            setLineContentsA([...moved]);
            return;
          }
        } else {
          const overIdIndex = getOverIdIndex(lineContentsB, overId);
          if (type === "draggable") {
            const id = getIdFromDraggable(activeId);
            const inserted = insertToArray<LineContent>(
              lineContentsB,
              { contentId: createSortableItemId("B", id), lineType: "normal" },
              overIdIndex
            );
            setLineContentsB([...inserted]);
            return;
          }
          if (type === "sortable") {
            const activeIdIndex = getActiveIdIndex(lineContentsB, activeId);
            const moved = arrayMove(lineContentsB, activeIdIndex, overIdIndex);
            setLineContentsB([...moved]);
            return;
          }
        }
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
        {activeId && getIdType(activeId) !== "draggable" ? (
          <OverLayItem itemId={activeId} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const getOverIdIndex = (lineContents: LineContent[], overId: string) => {
  if (getIdType(overId) !== "sortable") {
    return lineContents.length;
  }

  return lineContents.findIndex((c) => c.contentId === overId);
};

const getActiveIdIndex = (lineContents: LineContent[], activeId: string) => {
  if (getIdType(activeId) !== "sortable") {
    return lineContents.length;
  }
  return lineContents.findIndex((c) => c.contentId === activeId);
};

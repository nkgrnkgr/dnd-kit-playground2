import { Box, Code, Flex } from "@chakra-ui/react";
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
import { SortableLineItem } from "./Ground/Line/SortableLineItem";
import { createSortableItemId, getIdFromDraggable, getIdType } from "./lib/id";
import { insertToArray } from "./lib/insertToArray";
import { SideBar } from "./Sidebar";
import { LineContent, lineContentState } from "./store/line";

export const App: React.FC = () => {
  const [lineContents, setLineContents] = useRecoilState(
    lineContentState("line1")
  );

  const droppableIds = [EMPTY_LINE_ID, ...lineContents.map((c) => c.lineId)];

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && droppableIds.includes(event.over.id.toString())) {
      if (event.active.id) {
        const activeId = event.active.id.toString();
        const overId = event.over.id.toString();
        const overIdIndex = getOverIdIndex(lineContents, overId);
        const type = getIdType(activeId);

        if (type === "draggable") {
          const id = getIdFromDraggable(activeId);
          const inserted = insertToArray<LineContent>(
            lineContents,
            { lineId: createSortableItemId(id), lineType: "normal" },
            overIdIndex
          );
          setLineContents([...inserted]);
          return;
        }
        if (type === "sortable") {
          const activeIdIndex = getActiveIdIndex(lineContents, activeId);
          const moved = arrayMove(lineContents, activeIdIndex, overIdIndex);
          setLineContents([...moved]);
          return;
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
          <pre>
            <Code>{JSON.stringify(lineContents, null, 2)}</Code>
          </pre>
        </Box>
      </Flex>
      <DragOverlay>
        {activeId ? <OverLayItem itemId={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

const getOverIdIndex = (lineContents: LineContent[], overId: string) => {
  if (getIdType(overId) !== "sortable") {
    return lineContents.length;
  }

  return lineContents.findIndex((c) => c.lineId === overId);
};

const getActiveIdIndex = (lineContents: LineContent[], activeId: string) => {
  if (getIdType(activeId) !== "sortable") {
    return lineContents.length;
  }
  return lineContents.findIndex((c) => c.lineId === activeId);
};
